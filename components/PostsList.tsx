import { LoadingOutlined } from "@ant-design/icons";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { decode } from "html-entities";
import React, { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useBottomScrollListener } from "react-bottom-scroll-listener";
import styled from "styled-components";
import endpoints, { prefix } from "../constants/endpoints";
import TokenContext from "../contexts/TokenContext";
import { getPosts, votePost } from "../repository/reddit_api";
import { PostData } from "../types/types";
import Button from "./Button";
import PostHandler from "./PostHandler";
import PostView from "./PostView";
import PostListSkeleton from "./Skeletons/PostListSkeleton";
import Sorting from "./Sorting";

interface PostsListProps {
    endpoint?: string;
    initialData?: InfiniteData<PostData[]>;
}

const ListStyle = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-top: 16px;
    position: relative;
    overflow: hidden;

    > * {
        max-width: 600px;
        width: 100%;
        margin: 0 auto;
    }
`;

const LoadingCircle = styled.div`
    width: 40px;
    height: 40px;
    background-color: ${(p) => p.theme.primaryLight};
    color: ${(p) => p.theme.primary};
    border-radius: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    box-shadow: ${(p) => p.theme.cardShadow};
    position: absolute;
    top: -64px;
    left: 50%;
    transform: translateX(-50%);
    animation: slide_in 0.2s forwards;

    @keyframes slide_in {
        from {
            top: -64px;
        }
        to {
            top: 64px;
        }
    }
`;

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
        isRefetching,
        data,
        fetchNextPage,
        error,
        refetch,
    } = useInfiniteQuery(
        ["Home", endpoint, token, sorting],
        ({ pageParam = null }) => getPosts(token, sorting, pageParam),
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

    if (isLoading) return <PostListSkeleton />;
    if (isError || !data)
        return <p>Error{(error as string) && `: ${error}`}</p>;

    if (data)
        return (
            <ListStyle>
                {isRefetching && (
                    <LoadingCircle>
                        <LoadingOutlined />
                    </LoadingCircle>
                )}
                <Sorting
                    onChoose={setSorting}
                    current={sorting}
                    onRefresh={refetch}
                >
                    <Sorting.Type title="Best" link={endpoints.best} />
                    <Sorting.Type title="Hot" link={endpoints.hot} />
                </Sorting>
                {data.pages.map((page) =>
                    page.map((p) => <PostHandler key={p.name} postData={p} />)
                )}
                {isFetchingNextPage && <p>Fetching Next Page</p>}
                <Button
                    title="Next Page"
                    onClick={fetchNextPage}
                    disabled={isFetchingNextPage}
                />
            </ListStyle>
        );
    return <div></div>;
};

export default PostsList;
