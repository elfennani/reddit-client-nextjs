import { decode } from "html-entities";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import TokenContext from "../contexts/TokenContext";
import VotedPosts from "../contexts/VotedPosts";
import { votePost } from "../repository/reddit_api";
import PostView from "./PostView";

/**
 * @param {{postData:import('../repository/reddit_api').PostData,ignoreNSFW:boolean,ignoreImageSize:boolean}} props
 * @returns {React.Component}
 */
const PostHandler = ({
    postData,
    ignoreNSFW = false,
    ignoreImageSize = false,
}) => {
    const token = useContext(TokenContext);
    const votedPosts = useContext(VotedPosts);
    const [voteState, setVoteState] = useState(postData.voteState);

    useEffect(() => {
        if (Object.keys(votedPosts.posts).includes(postData.name)) {
            setVoteState(votedPosts.posts[postData.name]);
        }
    }, [votedPosts]);

    /**
     * @param {("upvoted"|"downvoted")} type
     * @param {string} name
     */
    const onVote = (type, name) => {
        if (
            (type == "upvoted" && voteState == true) ||
            (type == "downvoted" && voteState == false)
        ) {
            votePost(name, 0, token);
            setVoteState(null);
            votedPosts.setPostValue(name, null);
            return;
        }

        votedPosts.setPostValue(name, type == "upvoted");
        votePost(name, type == "upvoted" ? 1 : -1, token);
        setVoteState(type == "upvoted");
    };

    /**
     * @param {string} name
     * @param {"upvoted"|"downvoted"|null} initialState
     * @returns {"upvoted"|"downvoted"|null}
     */
    const getVoteState = (name, initialState = null) => {
        if (voteState == null) return null;
        return voteState ? "upvoted" : "downvoted";
    };
    return (
        <PostView
            key={postData.name}
            name={postData.name}
            title={decode(postData.title)}
            creator={"u/" + postData.author}
            commentCount={postData.commentsCount}
            subreddit={postData.subreddit}
            votes={
                postData.votes + (voteState == null ? 0 : voteState ? 1 : -1)
            }
            postLink={postData.permalink}
            creatorLink={`/u/${postData.author}`}
            extPostLink={postData.permalink}
            image={postData.image}
            images={postData.images}
            json={postData.devJson}
            createdOn={postData.created}
            onUpvote={() => onVote("upvoted", postData.name)}
            onDownvote={() => onVote("downvoted", postData.name)}
            onShare={() => console.log("share")}
            onSave={() => console.log("save")}
            nsfw={ignoreNSFW ? false : postData.nsfw}
            voteState={getVoteState(postData.name, postData.voteState)}
            ignoreImageSize={ignoreImageSize}
        />
    );
};

export default PostHandler;
