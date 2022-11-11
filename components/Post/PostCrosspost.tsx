import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import styled from "styled-components";
import PostConfig from "../../contexts/PostConfig";
import { PostData } from "../../types/types";
import { minimizeNumber, parseDate } from "../../utils/functions";
import SubredditIcon from "../SubredditIcon";
import PostMedia from "./PostMedia";

type Props = {
    data: PostData;
};

const Card = styled.div`
    margin: 16px;
    margin-top: 0;
    border: 1px solid ${(p) => p.theme.text25};
    border-radius: 7px;
    position: relative;
    z-index: 2;
    background: ${(p) => p.theme.background};

    header {
        padding: 16px;
        display: flex;
        align-items: center;
        gap: 8px;

        p {
            margin: 0;
            font-size: 0.8rem;
        }
    }

    > h2 {
        margin: 0 16px;
        font-size: 1.1rem;
        font-weight: 600;
    }

    > p {
        margin: 4px 16px;
        margin-bottom: 16px;
        font-size: 0.9rem;
        opacity: 0.8;
    }
`;

const PostCrosspost = ({ data }: Props) => {
    const router = useRouter();

    const wrapperLink = `${router.pathname}?post_id=${data.name.replace(
        "t3_",
        ""
    )}&${Object.entries(router.query).map(
        ([key, value], index, array) =>
            `${key}=${value}${index != array.length - 1 ? "&" : ""}`
    )}`;

    const { wrappedInLink } = useContext(PostConfig);

    return (
        <Card>
            {wrappedInLink && (
                <Link
                    href={wrapperLink}
                    as={`/post/${data.name.replace("t3_", "")}`}
                    shallow={true}
                >
                    <a className="link-wrapper"></a>
                </Link>
            )}
            <header>
                <SubredditIcon
                    subreddit={data.subreddit}
                    size={24}
                    radius={5}
                />
                <p>
                    {data.subreddit} • Posted by u/{data.author} •{" "}
                    {parseDate(data.created)} ago
                </p>
            </header>
            <PostMedia data={data} />
            <h2>{data.title}</h2>
            <p>
                {minimizeNumber(data.votes, 1)} votes •{" "}
                {minimizeNumber(data.commentsCount, 1)} comments
            </p>
        </Card>
    );
};

export default PostCrosspost;
