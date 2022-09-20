const prefix = "https://oauth.reddit.com";
const anon_prefix = "https://api.reddit.com";
export default {
    authorization: "https://www.reddit.com/api/v1/authorize",
    access_token: "https://www.reddit.com/api/v1/access_token",
    profile: `${prefix}/api/v1/me`,
    best: `${prefix}/best/`,
    subreddit: (subreddit) => `${prefix}/${subreddit}`,
    vote: `${prefix}/api/vote`,
    post_info: `${prefix}/api/info/`,
    post_info_anon: `${anon_prefix}/api/info/`,
};

// https://oauth.reddit.com/api/info/?id=
