import { LoadingOutlined } from "@ant-design/icons";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { decode } from "html-entities";
import React, { ReactNode, useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useBottomScrollListener } from "react-bottom-scroll-listener";
import styled from "styled-components";
import endpoints, { prefix } from "../constants/endpoints";
import TokenContext from "../contexts/TokenContext";
import { useError } from "../hooks/useError";
import { getPosts, votePost } from "../repository/reddit_api";
import { PostData, PostsListEndpoints } from "../types/types";
import Button from "./Button";
import PostHandler from "./PostHandler";
import PostListSkeleton from "./Skeletons/PostListSkeleton";
import Sorting from "./Sorting";

interface PostsListProps {
    endpoints?: PostsListEndpoints;
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
    z-index: 3;

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
    endpoints: _endpoints = [
        {
            name: "best",
            logged_routing: endpoints.best,
            anon_routing: null,
        },
        {
            name: "hot",
            logged_routing: endpoints.hot,
            anon_routing: endpoints.anonymous.hot,
        },
        {
            name: "new",
            logged_routing: endpoints.sorting("new"),
            anon_routing: endpoints.anonymous.sorting("new"),
        },
    ] as PostsListEndpoints,
    initialData = undefined,
}) => {
    const token = useContext(TokenContext);
    const [sorting, setSorting] = useState<string>(
        token
            ? _endpoints.filter((e) => !!e.anon_routing)[0].logged_routing
            : (_endpoints.filter((e) => !!e.anon_routing)[0]
                  .anon_routing as string)
    );

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
        ["Home", token, sorting],
        ({ pageParam = null }) => getPosts(token, sorting, pageParam),
        {
            getNextPageParam: (lastPage, allPages) =>
                lastPage[lastPage.length - 1].name || undefined,
            refetchOnMount: false,
            initialData,
        }
    );

    useError(error as string);

    useBottomScrollListener(!isFetchingNextPage ? fetchNextPage : () => {}, {
        offset: 5000,
    });

    const PageListSorting = () => (
        <Sorting
            onChoose={setSorting}
            current={sorting}
            onRefresh={refetch}
            isAnon={!token}
        >
            {_endpoints.map(
                (endpoint) =>
                    endpoint.anon_routing && (
                        <Sorting.Type
                            title={endpoint.name}
                            loggedLink={endpoint.logged_routing}
                            anonLink={endpoint.anon_routing}
                            key={endpoint.name}
                        />
                    )
            )}
        </Sorting>
    );
    if (isLoading)
        return (
            <ListStyle>
                {PageListSorting()}
                <PostListSkeleton />
            </ListStyle>
        );
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
                {PageListSorting()}
                {data.pages.map((page) =>
                    page.map((p) => <PostHandler key={p.name} postData={p} />)
                )}
                {isFetchingNextPage && <p>Fetching Next Page</p>}
                <Button
                    title="Next Page"
                    onClick={fetchNextPage as any}
                    disabled={isFetchingNextPage}
                />
            </ListStyle>
        );
    return <div></div>;
};

export default PostsList;
