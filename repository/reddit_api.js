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
 * @typedef PostData
 * @property {string} title
 * @property {string} votes
 * @property {string} name
 * @property {string} commentsCount
 * @property {string} subreddit
 * @property {string} author
 * @property {string} permalink
 * @property {string} image
 * @property {Number} created
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

        let image;

        try {
            image = post.preview.images[0].source.url.replaceAll("&amp;", "&");
        } catch (error) {}

        return {
            title: post.title,
            votes: post.score,
            name: post.name,
            commentsCount: post.num_comments,
            subreddit: post.subreddit_name_prefixed,
            author: post.author,
            permalink: "https://www.reddit.com" + post.permalink,
            image,
            created: post.created,
        };
    });
};
