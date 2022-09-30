import { useQuery } from "@tanstack/react-query";
import { decode } from "html-entities";
import React, { useContext } from "react";
import TokenContext from "../contexts/TokenContext";
import { getComments } from "../repository/reddit_api";
import CommentsHandler from "./Comments/CommentsList";

interface CommentsList {
    postName: string;
}
const CommentsList: React.FC<CommentsList> = ({ postName: name }) => {
    const token = useContext(TokenContext);

    const { data, isError, isLoading, error } = useQuery(
        ["comments", name, token],
        () => getComments(name, token)
    );

    return (
        <>
            {isError && <p style={{ color: "red" }}>{`Error: ${error}`}</p>}
            {isLoading && <p>Loading comments...</p>}
            {data &&
                data.map((commentInfo) => (
                    <CommentsHandler commentData={data} />
                ))}
        </>
    );
};

export default CommentsList;
