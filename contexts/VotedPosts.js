import { createContext } from "react";

/**
 * @callback SetPostValue
 * @param {string} name
 * @param {(boolean|null)} value
 * @returns {void}
 */
/**
 * @typedef VotedPostsContext
 * @property {{[string]:(boolean|null)}} posts
 * @property {SetPostValue} setPostValue
 */
/**
 * @type {VotedPostsContext}
 */
const config = {
    posts: {
        hello: null,
    },
    setPostValue: (name, value) => {},
};

export default createContext(config);
