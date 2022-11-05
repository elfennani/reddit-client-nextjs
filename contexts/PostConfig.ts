import { createContext } from "react";

type PostConfigType = {
    ignoreNSFW?: boolean;
    ignoreImageSize?: boolean;
    wrappedInLink?: boolean;
    textCompact?: boolean;
    disableSubredditLink?: boolean;
};

export default createContext<PostConfigType>({
    wrappedInLink: true,
    ignoreImageSize: false,
    ignoreNSFW: false,
    textCompact: true,
    disableSubredditLink: false,
});
