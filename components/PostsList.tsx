import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { decode } from "html-entities";
import React, { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useBottomScrollListener } from "react-bottom-scroll-listener";
import endpoints from "../constants/endpoints";
import TokenContext from "../contexts/TokenContext";
import { getPosts, votePost } from "../repository/reddit_api";
import { PostData } from "../types/types";
import Button from "./Button";
import PostHandler from "./PostHandler";
import PostView from "./PostView";
import Sorting from "./Sorting";

interface PostsListProps {
    endpoint?: string;
    initialData?: InfiniteData<PostData[]>;
}

const PostsList: React.FC<PostsListProps> = ({
    endpoint = endpoints.best,
    initialData = undefined,
}) => {
    const token = useContext(TokenContext);
    const [sorting, setSorting] = useState(endpoints.best);

    useEffect(() => console.log(sorting), [sorting]);

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
            initialData,
        }
    );

    useBottomScrollListener(!isFetchingNextPage ? fetchNextPage : () => {}, {
        offset: 5000,
    });

    useEffect(() => console.log(error), [error]);

    if (isLoading) return <p>Loading...</p>;
    if (isError || !data)
        return <p>Error{(error as string) && `: ${error}`}</p>;

    if (data)
        return (
            <>
                <Sorting onChoose={setSorting} current={sorting}>
                    <Sorting.Type title="Best" link={endpoints.best} />
                    <Sorting.Type title="Hot" link={endpoints.hot} />
                </Sorting>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 16,
                        marginTop: 16,
                    }}
                >
                    {data.pages.map((page) =>
                        page.map((p) => (
                            <PostHandler
                                key={p.name}
                                postData={p}
                                active={true}
                            />
                        ))
                    )}
                    {isFetchingNextPage && <p>Fetching Next Page</p>}
                    <Button
                        title="Next Page"
                        onClick={fetchNextPage}
                        disabled={isFetchingNextPage}
                    />
                </div>
            </>
        );
    return <div></div>;
};

export default PostsList;
