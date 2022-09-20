import { useInfiniteQuery } from "@tanstack/react-query";
import { decode } from "html-entities";
import React, { useState } from "react";
import { useContext } from "react";
import { useBottomScrollListener } from "react-bottom-scroll-listener";
import endpoints from "../constants/endpoints";
import TokenContext from "../contexts/TokenContext";
import { getPosts, votePost } from "../repository/reddit_api";
import Button from "./Button";
import PostHandler from "./PostHandler";
import PostView from "./PostView";

/**
 *
 * @param {{endpoint:string}} props
 * @returns {React.Component}
 */
function PostsList({ endpoint = endpoints.best }) {
    const token = useContext(TokenContext);

    const {
        isLoading,
        isFetchingNextPage,
        isError,
        data,
        fetchNextPage,
        error,
    } = useInfiniteQuery(
        ["Home", endpoint, token],
        ({ pageParam = null }) => getPosts(token, endpoint, pageParam),
        {
            getNextPageParam: (lastPage, allPages) =>
                lastPage[lastPage.length - 1].name || undefined,
            refetchOnMount: false,
        }
    );

    useBottomScrollListener(!isFetchingNextPage ? fetchNextPage : () => {}, {
        offset: 5000,
    });

    if (isLoading) return <p>Loading...</p>;
    if (isError || !data) return <p>Error{error && `: ${error}`}</p>;

    if (data)
        return (
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 16,
                    marginTop: 16,
                }}
            >
                {data.pages.map((page) =>
                    page.map((p) => <PostHandler key={p.name} postData={p} />)
                )}
                {isFetchingNextPage && <p>Fetching Next Page</p>}
                <Button
                    title="Next Page"
                    onClick={fetchNextPage}
                    disabled={isFetchingNextPage}
                />
            </div>
        );
}

export default PostsList;
