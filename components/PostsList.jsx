import { useQuery, useQueryClient } from "@tanstack/react-query";
import { da } from "date-fns/locale";
import React from "react";
import { useContext } from "react";
import endpoints from "../constants/endpoints";
import TokenContext from "../contexts/TokenContext";
import { getPosts } from "../repository/reddit_api";
import PostView from "./PostView";

/**
 *
 * @param {{endpoint:string}} props
 * @returns {React.Component}
 */
function PostsList({ endpoint = endpoints.best }) {
    const token = useContext(TokenContext);

    const { isLoading, isError, data, error } = useQuery(
        ["Home", endpoint, token],
        () => getPosts(token, endpoint)
    );

    if (isLoading) return <p>Loading...</p>;
    if (isError || !data) return <p>Error: {error}</p>;
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: 16,
                marginTop: 16,
            }}
        >
            {data.map((p) => (
                <PostView
                    key={p.name}
                    title={p.title}
                    creator={"u/" + p.author}
                    commentCount={p.commentsCount}
                    subreddit={{
                        name: p.subreddit,
                        link: `/${p.subreddit}`,
                    }}
                    votes={p.votes}
                    postLink={p.permalink}
                    creatorLink={`/u/${p.author}`}
                    extPostLink={p.permalink}
                    image={p.image}
                    createdOn={p.created}
                />
            ))}
        </div>
    );
}

export default PostsList;
