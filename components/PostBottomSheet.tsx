import { ArrowLeftOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import hi from "date-fns/esm/locale/hi/index.js";
import Head from "next/head";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import React, { useCallback, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import PostConfig from "../contexts/PostConfig";
import PostNameContext from "../contexts/PostNameContext";
import TokenContext from "../contexts/TokenContext";
import { getPostData } from "../repository/reddit_api";
import CommentsList from "./CommentsList";
import Hr from "./Hr";
import PostHandler from "./PostHandler";
import PostViewSkeleton from "./Skeletons/PostViewSkeleton";

const slidingSpeed = 0.2;
const bottomSheetHeaderHeight = 50;

const BottomSheet = styled.div<{ hide?: boolean }>`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: calc(100vh - 120px);
    background-color: ${(p) => p.theme.background};
    z-index: 20;
    border-radius: 24px 24px 0 0;
    padding: 32px;
    overflow: auto;
    box-shadow: ${(p) => p.theme.bottomSheetShadow};
    animation: slide ${slidingSpeed}s ease-out;

    &.slidedown {
        animation: slidedown ${slidingSpeed}s forwards ease-in !important;
    }

    @keyframes slide {
        from {
            transform: translateY(100%);
        }
        to {
            transform: translateY(0%);
        }
    }
    @keyframes slidedown {
        from {
            transform: translateY(0%);
        }
        to {
            transform: translateY(100%);
        }
    }

    @keyframes slideright {
        from {
            transform: translateX(100%);
        }
        to {
            transform: translateX(0%);
        }
    }

    @keyframes slideleft {
        from {
            transform: translateX(0%);
        }
        to {
            transform: translateX(100%);
        }
    }

    @media screen and (max-width: 930px) {
        padding: 16px;
        top: 0;
        height: unset;
        border-radius: 0;
        padding-top: ${bottomSheetHeaderHeight + 16}px;
        animation: slideright ${slidingSpeed}s ease-out;

        &.slidedown {
            animation: slideleft ${slidingSpeed}s forwards ease-in !important;
        }
    }
`;

const Backdrop = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 19;
    cursor: pointer;
    transition: all ${slidingSpeed}s;

    &.fadeout {
        opacity: 0;
    }
`;

const Wrapper = styled.div`
    width: 1200px;
    max-width: calc(100% - 0px);
    margin: 0 auto;
    display: flex;
    gap: 16px;
    align-items: flex-start;

    > div {
        flex: 3;
        min-width: 100px;
    }

    .horizontal-line {
        display: none;
    }

    @media screen and (max-width: 930px) {
        flex-direction: column;
        width: 600px;
        align-items: stretch;

        > div {
            flex: unset;
        }

        .horizontal-line {
            display: block;
        }
    }
`;

const CommentsWrapper = styled.div`
    max-width: 100%;
    flex: 2 !important;
`;

const BottomSheetHeader = styled.header`
    height: ${bottomSheetHeaderHeight}px;
    background: ${(p) => p.theme.cardBg};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    top: 0;
    z-index: 2;
    border-bottom: 1px solid
        rgba(${(p) => (p.theme.name == "dark" ? "255,255,255" : "0,0,0")}, 0.12);
    display: grid;
    grid-template-columns: ${bottomSheetHeaderHeight}px 1fr;
    grid-template-rows: ${bottomSheetHeaderHeight}px;
    align-items: stretch;
    gap: 16px;
    color: ${(p) => p.theme.text};

    @media screen and (min-width: 931px) {
        display: none;
    }

    button {
        background-color: transparent;
        border: none;
        outline: none;
        font-size: 16px;
        color: inherit;

        &:hover {
            background: rgba(
                ${(p) => (p.theme.name == "dark" ? "255,255,255" : "0,0,0")},
                0.07
            );
        }
    }

    h1 {
        font-size: 1rem;
        font-weight: 600;
        margin: 0;
        line-height: ${bottomSheetHeaderHeight}px;
    }
`;

const PostBottomSheet = () => {
    const router = useRouter();
    const postId = router.query.post_id as string;
    const token = useContext(TokenContext);
    const { data, isLoading } = useQuery(["post", token, postId], () =>
        getPostData(postId, token)
    );
    const [hidden, setHidden] = useState(false);

    useEffect(() => {
        Router.events.on("routeChangeStart", hideBottomSheet);

        const escapePress = (ev: KeyboardEvent) => {
            if (ev.key == "Escape") {
                router.back();
                window.removeEventListener("keydown", escapePress);
            }
        };

        window.addEventListener("keydown", escapePress);

        return () => {
            Router.events.off("routeChangeStart", hideBottomSheet);
            window.removeEventListener("keydown", escapePress);
        };
    }, []);

    const hideBottomSheet = useCallback((e: any) => {
        setHidden(true);

        setTimeout(() => {
            e.type == "click" && router.back();
        }, slidingSpeed * 1000);
    }, []);

    return (
        <>
            <Head>
                {data && (
                    <title>
                        {data.title} • {data.subreddit}
                    </title>
                )}
            </Head>
            <Backdrop
                onClick={!hidden ? hideBottomSheet : undefined}
                className={hidden ? "fadeout" : ""}
            />
            <BottomSheet className={hidden ? "slidedown" : ""}>
                <Wrapper>
                    <PostNameContext.Provider value={"t3_" + postId}>
                        <PostConfig.Provider
                            value={{
                                wrappedInLink: false,
                                textCompact: false,
                                ignoreNSFW: true,
                                ignoreImageSize: true,
                            }}
                        >
                            <BottomSheetHeader>
                                <button type="button" onClick={hideBottomSheet}>
                                    {<ArrowLeftOutlined />}
                                </button>
                                {data && (
                                    <Link href={`/${data.subreddit}`}>
                                        <a>
                                            <h1>{data.subreddit}</h1>
                                        </a>
                                    </Link>
                                )}
                            </BottomSheetHeader>
                            {data && <PostHandler postData={data} />}
                            {isLoading && <PostViewSkeleton />}
                            <Hr
                                className="horizontal-line"
                                spacing={12}
                                opacity={0.24}
                            />
                            <CommentsWrapper>
                                <CommentsList postName={postId} />
                            </CommentsWrapper>
                        </PostConfig.Provider>
                    </PostNameContext.Provider>
                </Wrapper>
            </BottomSheet>
        </>
    );
};

export default PostBottomSheet;
