export const prefix = "https://oauth.reddit.com";
export const anon_prefix = "https://api.reddit.com";
export default {
    authorization: "https://www.reddit.com/api/v1/authorize",
    access_token: "https://www.reddit.com/api/v1/access_token",
    profile: `${prefix}/api/v1/me`,
    best: `${prefix}/best/`,
    hot: `${prefix}/hot/`,
    sorting: (sorting: string) => `${prefix}/${sorting}`,
    subreddit: (subreddit: string) => `${prefix}/${subreddit}/about`,
    subreddit_sorting: (subreddit: string, sortingName: string) =>
        `${prefix}/r/${subreddit}/${sortingName}`,
    vote: `${prefix}/api/vote`,
    post_info: `${prefix}/api/info/`,
    post_info_anon: `${anon_prefix}/api/info/`,
    user_info: (username: string) => `${prefix}/user/${username}/about`,
    save: `${prefix}/api/save`,
    unsave: `${prefix}/api/unsave`,
    search_ac: (query: string, limit = 5) =>
        `${prefix}/api/subreddit_autocomplete?limit=${limit}&query=${query}&include_profiles`, // Search Auto Complete
    anonymous: {
        best: `${anon_prefix}/best/`,
        hot: `${anon_prefix}/hot/`,
        sorting: (sorting: string) => `${anon_prefix}/${sorting}`,
        user_info: (username: string) =>
            `${anon_prefix}/user/${username}/about`,
        subreddit: (subreddit: string) => `${anon_prefix}/${subreddit}/about`,
        subreddit_sorting: (subreddit: string, sortingName: string) =>
            `${anon_prefix}/r/${subreddit}/${sortingName}`,
        search_ac: (query: string, limit = 5) =>
            `${anon_prefix}/api/subreddit_autocomplete?limit=${limit}&query=${query}&include_profiles`,
    },
};
