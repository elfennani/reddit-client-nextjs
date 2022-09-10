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
