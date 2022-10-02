export interface UserData {
    username: string;
    fullname: string;
    karma: Number;
    created: Number;
    cover: string;
    pfp: string;
}

export interface ImagesMetadata {
    url: string;
    title: string | null;
    id: string;
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
    images?: ImagesMetadata[];
    created: number;
    devJson: Object;
    nsfw: boolean;
    voteState: boolean | null;
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
}