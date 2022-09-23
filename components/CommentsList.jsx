import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import TokenContext from "../contexts/TokenContext";
import { getComments } from "../repository/reddit_api";

/**
 * @param {{name:string}} prop
 * @returns {React.Component}
 */
const CommentsList = ({ name }) => {
    const token = useContext(TokenContext);

    const {
        data,
        isError,
        isLoading,
        error,
    } = useQuery(["comments", name, token], () =>
        getComments(name, token)
    );

    return (
        <>
            {isError && <p style={{ color: "red" }}>Error: {error}</p>}
            {isLoading && <p>Loading comments...</p>}
            {data &&
                data.map((commentInfo) => (
                    <Card
                        style={{ padding: 16, margin: "8px 0" }}
                        key={commentInfo.data.name}
                        dangerouslySetInnerHTML={{
                            __html: decode(commentInfo.),
                        }}
                    ></Card>
                ))}
        </>
    );
};

export default CommentsList;
