import { MoreOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import { PostData } from "../../types/types";
import { parseDate } from "../../utils/functions";
import SubredditIcon from "../SubredditIcon";
import PostButton from "./PostButton";

type Props = {
    data: PostData;
};

const HeaderStyle = styled.header`
    padding: 16px;
    display: flex;
    align-items: center;
    gap: 8px;

    .icon-link {
        display: block;
        height: 45px;
    }
`;

const SubInfo = styled.div`
    flex: 1;

    h1,
    p {
        margin: 0;
    }

    h1 {
        font-size: 1rem;
        font-weight: 400;
    }
    p {
        font-size: 0.75rem;
        opacity: 0.5;
        padding-bottom: 4px;
    }
`;

const PostHeader = (props: Props) => {
    // TODO: remove later
    const router = useRouter();

    return (
        <HeaderStyle>
            <Link href={`/${props.data.subreddit}`}>
                <a className="icon-link">
                    <SubredditIcon subreddit={props.data.subreddit} size={45} />
                </a>
            </Link>
            <SubInfo>
                <h1>
                    <Link href={`/${props.data.subreddit}`}>
                        <a>{props.data.subreddit}</a>
                    </Link>
                </h1>
                <p>
                    Posted by{" "}
                    <Link href={`/u/${props.data.author}`}>
                        <a>u/{props.data.author}</a>
                    </Link>{" "}
                    {"\u2022"} {parseDate(props.data.created)} ago
                </p>
            </SubInfo>
            <PostButton
                title="More Options"
                onClick={() =>
                    router.push(props.data.permalink, undefined, {
                        locale: false,
                    })
                }
                icon={<MoreOutlined />}
            />
        </HeaderStyle>
    );
};

export default PostHeader;
