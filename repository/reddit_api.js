/**
 * @typedef UserData
 * @property {string} username
 * @property {string} fullname
 * @property {Number} karma
 * @property {Number} created
 * @property {string} cover
 * @property {string} pfp
 */

import endpoints from "../constants/endpoints";
import { removeAmp } from "../utils/functions";

/**
 * @property {string} token
 * @return {Promise<UserData>}
 */
export const getUserProfile = async (token) => {
    const res = await fetch(endpoints.profile, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await res.json();

    return {
        username: data.subreddit.display_name_prefixed,
        fullname: data.subreddit.title,
        karma: data.total_karma,
        created: data.created_utc,
        pfp: data.icon_img.replaceAll("&amp;", "&"),
    };
};

/**
 * @typedef ImagesMetadata
 * @property {string} url
 * @property {string|null} title
 * @property {string} id
 */
/**
 * @typedef PostData
 * @property {string} title
 * @property {string} votes
 * @property {string} name
 * @property {string} commentsCount
 * @property {string} subreddit
 * @property {string} author
 * @property {string} permalink
 * @property {string} image
 * @property {ImagesMetadata[]} images
 * @property {Number} created
 * @property {Object} devJson
 * @property {boolean} nsfw
 */
/**
 *
 * @param {string} token
 * @param {string} endpoint
 * @param {string} after
 * @returns {Promise<PostData[]>}
 */
export const getPosts = async (token, endpoint, after) => {
    const res = await fetch(endpoint + (after ? `?after=${after}` : ""), {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await res.json();

    return data.data.children.map((data) => {
        const post = data.data;

        /**
         * @type {PostData}
         */
        let post_maped = {
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
        };

        if (post.post_hint == "image")
            post_maped.image = post.preview.images[0].source.url.replaceAll(
                "&amp;",
                "&"
            );
        else if (post.media_metadata) {
            let notAnImage = false;
            post_maped.images = Object.keys(post.media_metadata).map((key) => {
                if (notAnImage) return;
                if (post.media_metadata[key].e != "Image") {
                    notAnImage = true;
                    return;
                }
                return {
                    id: key,
                    url: removeAmp(post.media_metadata[key].s.u),
                    title:
                        post.gallery_data.items.filter(
                            (item) => item.media_id == key
                        )[0].caption || null,
                };
            });

            if (notAnImage) {
                post_maped.images = undefined;
            }
        }

        return post_maped;
    });
};
