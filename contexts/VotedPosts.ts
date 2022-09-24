import { createContext } from "react";

interface VotedPosts {
    [key: string]: boolean | null;
}
export interface VotedPostsContext {
    posts: VotedPosts;
    setPostValue(name: string, value: boolean | null): void;
}

const config: VotedPostsContext = {
    posts: {},
    setPostValue: (name: string, value: boolean | null) => {},
};

export default createContext(config);
