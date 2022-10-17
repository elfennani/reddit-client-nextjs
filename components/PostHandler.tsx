import { decode } from "html-entities";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import TokenContext from "../contexts/TokenContext";
import VotedPosts from "../contexts/VotedPosts";
import { votePost } from "../repository/reddit_api";
import { PostData } from "../types/types";
import PostView from "./PostView";

interface PostHandlerProps {
    postData: PostData;
}
const PostHandler: React.FC<PostHandlerProps> = ({ postData }) => {
    const token = useContext(TokenContext);
    const votedPosts = useContext(VotedPosts);
    const [voteState, setVoteState] = useState(postData.voteState);

    useEffect(() => {
        if (Object.keys(votedPosts.posts).includes(postData.name)) {
            setVoteState(votedPosts.posts[postData.name]);
        }
    }, [votedPosts]);

    const onVote = (type: "upvoted" | "downvoted", name: string) => {
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

    const getVoteState = (): boolean | null => {
        if (voteState == null) return null;
        return voteState ? true : false;
    };

    return (
        <PostView
            data={postData}
            key={postData.name}
            // votes={
            //     postData.votes + (voteState == null ? 0 : voteState ? 1 : -1)
            // }
            // extPostLink={postData.permalink}
            // image={postData.image}
            // images={postData.images}
            // json={postData.devJson}
            // createdOn={postData.created}
            onUpvote={() => onVote("upvoted", postData.name)}
            onDownvote={() => onVote("downvoted", postData.name)}
            // onShare={() => console.log("share")}
            // onSave={() => console.log("save")}
            // nsfw={ignoreNSFW ? false : postData.nsfw}
            voteState={getVoteState()}
            // ignoreImageSize={ignoreImageSize}
            // imageWidth={postData.imageWidth}
            // imageHeight={postData.imageHeight}
            // active={active}
        />
    );
};

export default PostHandler;
