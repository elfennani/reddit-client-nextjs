import { useInfiniteQuery } from "@tanstack/react-query";
import { decode } from "html-entities";
import React, { useState } from "react";
import { useContext } from "react";
import { useBottomScrollListener } from "react-bottom-scroll-listener";
import endpoints from "../constants/endpoints";
import TokenContext from "../contexts/TokenContext";
import { getPosts, votePost } from "../repository/reddit_api";
import Button from "./Button";
import PostView from "./PostView";

/**
 *
 * @param {{endpoint:string}} props
 * @returns {React.Component}
 */
function PostsList({ endpoint = endpoints.best }) {
    const token = useContext(TokenContext);
    const [upvotedPosts, setUpvotedPosts] = useState({});

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

    /**
     *
     * @param {("upvote"|"downvote")} type
     * @param {string} name
     */
    const onVote = (type, name) => {
        if (type != "upvote" && type != "downvote") {
            throw 'Type should be either "upvote" or "downvote"';
        }

        setUpvotedPosts((upvotedPosts) => {
            if (
                Object.keys(upvotedPosts).includes(name) &&
                upvotedPosts[name] != undefined
            ) {
                const state = upvotedPosts[name] ? "upvote" : "downvote";
                if (state == type) {
                    votePost(name, 0, token);
                    return { ...upvotedPosts, [name]: undefined };
                }
            }

            votePost(name, type == "upvote" ? 1 : -1, token);
            return { ...upvotedPosts, [name]: type == "upvote" ? true : false };
        });
    };

    /**
     * @param {string} name
     * @returns {"upvoted"|"downvoted"|null}
     */
    const getVoteState = (name) => {
        if (upvotedPosts[name] != undefined)
            return upvotedPosts[name] ? "upvoted" : "downvoted";
        return null;
    };

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
                    page.map((p) => (
                        <PostView
                            key={p.name}
                            name={p.name}
                            title={decode(p.title)}
                            creator={"u/" + p.author}
                            commentCount={p.commentsCount}
                            subreddit={p.subreddit}
                            votes={p.votes}
                            postLink={p.permalink}
                            creatorLink={`/u/${p.author}`}
                            extPostLink={p.permalink}
                            image={p.image}
                            images={p.images}
                            json={p.devJson}
                            createdOn={p.created}
                            onUpvote={() => onVote("upvote", p.name)}
                            onDownvote={() => onVote("downvote", p.name)}
                            onShare={() => console.log("share")}
                            onSave={() => console.log("save")}
                            nsfw={p.nsfw}
                            voteState={getVoteState(p.name)}
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
        );
}

export default PostsList;
