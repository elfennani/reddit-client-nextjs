import { decode } from "html-entities";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import NotificationsAPI from "../contexts/NotificationsAPI";
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
    const notifications = useContext(NotificationsAPI);
    const [voteState, setVoteState] = useState(postData.voteState);

    useEffect(() => {
        if (Object.keys(votedPosts.posts).includes(postData.name)) {
            setVoteState(votedPosts.posts[postData.name]);
        }
    }, [votedPosts]);

    const onVote = (type: "upvoted" | "downvoted", name: string) => {
        if (!token) {
            notifications.notify(
                `You have to be logged in to ${type}`,
                "red",
                10
            );
            return;
        }
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
            onUpvote={() => onVote("upvoted", postData.name)}
            onDownvote={() => onVote("downvoted", postData.name)}
            voteState={getVoteState()}
        />
    );
};

export default PostHandler;
