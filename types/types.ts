import { type } from "os";

export interface UserData {
    username: string;
    fullname: string;
    karma: number;
    created: number;
    cover?: string;
    pfp: string;
    description: string;
    followers: number;
}

export interface ImagesMetadata {
    url: string;
    title: string | null;
    id: string;
    width: number;
    height: number;
}

export interface PostData {
    title: string;
    votes: number;
    name: string;
    commentsCount: number;
    subreddit: string;
    author: string;
    permalink: string;
    image?: string;
    imageWidth?: number;
    imageHeight?: number;
    images?: ImagesMetadata[];
    created: number;
    devJson?: Object;
    nsfw: boolean;
    voteState: boolean | null;
    text?: string;
    text_html?: string;
    link?: string;
    poll?: PollData;
    saved: boolean;
    youtubeIframe?: {
        src: string;
        width: number;
        height: number;
        allow: string;
        title: string;
    };
    redditVideo?: RedditVideoData;
    crosspost?: PostData;
}

export interface RedditVideoData {
    fallbackUrl: string;
    width: number;
    height: number;
    hlsUrl: string;
    duration: number;
    isGif: boolean;
    thumbnail?: ImagesMetadata;
}

export type PollDataOption = {
    id: string;
    text: string;
    votes: number | null;
};

export interface PollData {
    voting_end: number;
    selection: string;
    options: PollDataOption[];
    total_votes: number;
    poll_url: string;
}

export interface SubredditInfoData {
    icon?: string;
    primary_color?: string;
}

export interface CommentData {
    name: string;
    content: string;
    replies?: CommentData[];
    more?: string[];
    moreId?: string;
    depth: number;
    author: string;
    json: any;
    text: string;
    created: number;
    isOP: boolean;
}

interface PostsListEndpoint {
    name: string;
    anon_routing: string;
    logged_routing: string;
}

export type PostsListEndpoints = PostsListEndpoint[];

export type SearchAutocompleteResults = {
    name: string;
    icon: string | undefined;
    isUser: boolean;
    followers: number;
    id: string;
};
