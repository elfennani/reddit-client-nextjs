import React, { useContext, useEffect, useState } from "react";
import PostNameContext from "../../contexts/PostNameContext";
import TokenContext from "../../contexts/TokenContext";
import { getReadMoreComments } from "../../repository/reddit_api";
import { CommentData } from "../../types/types";
import Button from "../Button";
import CommentsHandler from "./CommentsHandler";

interface Props {
    commentList: string[];
    id: string;
}

const CommentReadMore: React.FC<Props> = (props) => {
    const postFullName = useContext(PostNameContext);
    const token = useContext(TokenContext);
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<CommentData[] | null>(null);

    const getComments = async () => {
        setIsLoading(true);
        try {
            const comments = await getReadMoreComments(
                props.commentList,
                postFullName,
                token
            );
            setData(comments);
            return;
        } catch (error) {
            console.log("Error loading more comments: ", error);
        }
        setIsLoading(false);
    };

    if (data) return <CommentsHandler commentData={data} />;

    return (
        <Button
            title={isLoading ? "Loading..." : "Read more"}
            onClick={getComments}
            secondary
            style={{ margin: 4, marginTop: 0 }}
            disabled={isLoading}
        />
    );
};

export default CommentReadMore;
