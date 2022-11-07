import { decode } from "html-entities";
import config from "../constants/config";
import endpoints from "../constants/endpoints";
import {
    CommentData,
    ImagesMetadata,
    PollData,
    PollDataOption,
    PostData,
    SubredditInfoData,
    UserData,
} from "../types/types";
import { removeAmp } from "../utils/functions";

const getAuth = (
    token: string | undefined,
    params?: RequestInit
): RequestInit | undefined => {
    return token
        ? {
              headers: {
                  Authorization: `Bearer ${token}`,
              },
              ...params,
          }
        : params;
};

export const getLoginLink = () => {
    const params = {
        client_id: config.clientId,
        response_type: "code",
        state: "auth",
        redirect_uri: config.redirectUri,
        duration: "permanent",
        scope: [
            "identity",
            "edit",
            "flair",
            "history",
            "modconfig",
            "modflair",
            "modlog",
            "modposts",
            "modwiki",
            "mysubreddits",
            "privatemessages",
            "read",
            "report",
            "save",
            "submit",
            "subscribe",
            "vote",
            "wikiedit",
            "wikiread",
        ],
    };

    const stringParams = (
        Object.keys(params) as (keyof typeof params)[]
    ).reduce(
        (prev, current, index, array) =>
            `${prev}${current}=${params[current]}${
                index == array.length - 1 ? "" : "&"
            }`,
        ""
    );

    return `${endpoints.authorization}?${stringParams}`;
};

export const getUserProfile = async (
    token: string,
    user: string | null = null
): Promise<UserData> => {
    let res: Response;

    if (!user) {
        res = await fetch(endpoints.profile, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } else {
        res = await fetch(
            token
                ? endpoints.user_info(user)
                : endpoints.anonymous.user_info(user),
            getAuth(token)
        );
    }

    let data = await res.json();

    if (user) data = data.data;

    return {
        username: data.subreddit.display_name_prefixed,
        fullname: data.subreddit.title,
        karma: data.total_karma,
        created: data.created_utc,
        pfp: data.icon_img.replaceAll("&amp;", "&"),
        description: data.subreddit.public_description,
    };
};

export const parsePost = (data: any): PostData => {
    const post = data.data;

    let post_maped: PostData = {
        title: post.title,
        votes: post.score,
        name: post.name,
        commentsCount: post.num_comments,
        subreddit: post.subreddit_name_prefixed,
        author: post.author,
        permalink: "https://www.reddit.com" + post.permalink,
        created: post.created,
        devJson: post,
        nsfw: post.over_18,
        voteState: post.likes,
        text: post.selftext,
        text_html: post.selftext_html,
        saved: post.saved,
    };

    if (
        !post.is_reddit_media_domain &&
        !post.is_gallery &&
        post.url_overridden_by_dest
    ) {
        post_maped.link = post.url_overridden_by_dest;
    }

    if (post.poll_data) {
        const poll = post.poll_data;
        const pollData: PollData = {
            voting_end: poll.voting_end_timestamp,
            selection: poll.user_selection || null,
            total_votes: poll.total_vote_count,
            options: poll.options.map(
                (opt: any): PollDataOption => ({
                    id: opt.id,
                    text: opt.text,
                    votes: opt.vote_count || null,
                })
            ),
            poll_url: post.url,
        };

        post_maped.poll = pollData;
    }

    if (post.post_hint == "image") {
        post_maped.image = post.preview.images[0].source.url.replaceAll(
            "&amp;",
            "&"
        );
        post_maped.imageWidth = post.preview.images[0].source.width;
        post_maped.imageHeight = post.preview.images[0].source.height;
    } else if (post.media_metadata) {
        let notAnImage = false;
        try {
            const images: (ImagesMetadata | undefined)[] = Object.keys(
                post.media_metadata
            ).map((key) => {
                if (notAnImage) return;
                if (post.media_metadata[key].e != "Image") {
                    notAnImage = true;
                    return;
                }
                return <ImagesMetadata>{
                    id: key,
                    url: removeAmp(post.media_metadata[key].s.u),
                    width: post.media_metadata[key].s.x,
                    height: post.media_metadata[key].s.y,
                    title:
                        post.gallery_data && post.gallery_data.items
                            ? post.gallery_data.items.filter(
                                  (item: any) => item.media_id == key
                              )[0].caption || null
                            : null,
                };
            });

            post_maped.images = images.filter(
                (image) => image != undefined
            ) as ImagesMetadata[];
        } catch (error) {
            console.error("Failed Loading Post: ", post);
        }

        if (notAnImage) {
            post_maped.images = undefined;
        }
    }

    if (!post_maped.image) delete post_maped.image;
    if (!post_maped.images) delete post_maped.images;

    return post_maped;
};

export const getPosts = async (
    token: string | undefined,
    endpoint: string,
    after: string | null
): Promise<PostData[]> => {
    const res = await fetch(
        endpoint + (after ? `?after=${after}` : ""),
        getAuth(token)
    );

    if (res.status != 200) throw "Error Loading Posts";

    const data = await res.json();
    return data.data.children.map(parsePost);
};

export const getSubredditInfo = async (
    subreddit: string,
    token: string
): Promise<SubredditInfoData> => {
    const res = await fetch(
        token
            ? endpoints.subreddit(subreddit)
            : endpoints.anonymous.subreddit(subreddit),
        getAuth(token)
    );
    const json = await res.json();
    const data = json.data;

    const result: SubredditInfoData = {
        primary_color: data.key_color,
    };

    if (data.community_icon) {
        result.icon = decode(data.community_icon);
    } else if (data.icon_img) {
        result.icon = decode(data.icon_img);
    }

    return result;
};

export const votePost = async (
    id: string,
    voteState: -1 | 1 | 0,
    token: string
) => {
    try {
        const res = await fetch(endpoints.vote, {
            method: "post",
            body: `id=${id}&dir=${voteState}&rank=1`,
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
    } catch (error) {
        console.error(error);
    }
};

export const getPostData = async (
    id: string,
    token?: string
): Promise<PostData> => {
    let res;
    if (!id.includes("t3_")) {
        id = `t3_${id}`;
    }
    if (token) {
        res = await fetch(endpoints.post_info + `?id=${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } else {
        res = await fetch(endpoints.post_info_anon + `?id=${id}`);
    }
    const data = await res.json();
    return data.data.children.map(parsePost)[0];
};

const parseComment = (data: any, isReadMore = false): CommentData[] => {
    return data.map((comment: any): CommentData | string => {
        const data = isReadMore ? comment : comment.data;
        let replies: CommentData[] | undefined;
        if (!isReadMore) {
            replies =
                data.replies && comment.kind != "more"
                    ? parseComment(data.replies.data.children)
                    : undefined;
        } else {
            replies =
                data.replies && data.replies.length != 0
                    ? parseComment(data.replies, true)
                    : undefined;
        }

        return {
            name: data.name as string,
            content: data.body_html,
            depth: data.depth,
            replies,
            more: data.children ? data.children : undefined,
            moreId: data.children ? data.id : undefined,
            author: data.author,
            json: data,
            text: data.body,
            created: data.created,
            isOP: data.is_submitter,
        };
    }) as CommentData[];
};

export const getComments = async (
    name: string,
    token?: string
): Promise<CommentData[]> => {
    const requestInit: RequestInit = token
        ? {
              headers: {
                  Authorization: `Bearer ${token}`,
              },
          }
        : {};
    const res = await fetch(
        `https://${token ? "oauth" : "api"}.reddit.com/comments/${name.replace(
            "t3_",
            ""
        )}?limit=25`,
        requestInit
    );

    const data = await res.json();

    const comments = parseComment(data[1].data.children) as CommentData[];

    return comments;
};

export const getReadMoreComments = async (
    commentList: string[],
    postId: string,
    token?: string
) => {
    const requestInit: RequestInit = token
        ? {
              headers: {
                  Authorization: `Bearer ${token}`,
              },
          }
        : {};
    const res = await fetch(
        `https://${
            token ? "oauth" : "api"
        }.reddit.com/api/morechildren?api_type=json&link_id=${postId}&children=${commentList.join(
            ","
        )}`,
        requestInit
    );

    return parseCommentReplies(await res.json(), commentList);
};

export const parseCommentReplies = (
    data: any,
    topLevelCommentsIds: string[]
): CommentData[] => {
    const things = data.json.data.things as any[];

    const topLevelComments = things.filter((comment: any) =>
        topLevelCommentsIds.includes(comment.data.id)
    );

    const comments = topLevelComments.map((comment) => {
        return {
            ...comment.data,
            replies: getReplies(comment.data.id, things),
        };
    });

    return parseComment(comments, true);
};

const getReplies = (parent: string, allChildren: any[]): any[] => {
    const replies = [];

    for (let i = 0; i < allChildren.length; i++) {
        const comment = allChildren[i].data;
        if (comment.parent_id == `t1_${parent}`)
            replies.push({
                ...comment,
                replies: getReplies(comment.id, allChildren),
            });
    }

    return replies;
};

export const savePost = async (
    token: string,
    category: string,
    fullname: string,
    onSuccess: () => void
): Promise<void> => {
    const res = await fetch(endpoints.save, {
        method: "POST",
        body: `category=${category}&id=${fullname}`,
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
    });

    if (res.status == 200) {
        onSuccess();
    }
};

export const unsavePost = async (
    token: string,
    fullname: string,
    onSuccess: () => void
) => {
    const res = await fetch(endpoints.unsave, {
        method: "POST",
        body: `id=${fullname}`,
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
    });

    if (res.status == 200) {
        onSuccess();
    }
};

export const getSavedPosts = async (token: string, username: string) => {
    console.log(token);
    try {
        const res = await fetch(
            `https://oauth.reddit.com/user/${username}/saved`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        console.log(await res.json());
    } catch (error) {
        console.log(error);
    }
};
