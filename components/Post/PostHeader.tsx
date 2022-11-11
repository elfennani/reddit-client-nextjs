import { MoreOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import styled from "styled-components";
import PostConfig from "../../contexts/PostConfig";
import { PostData } from "../../types/types";
import { parseDate } from "../../utils/functions";
import SubredditIcon from "../SubredditIcon";
import PostButton from "./PostButton";
import PostMore from "./PostMore";

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

    .space {
        flex: 1;
    }
`;

const SubInfo = styled.div`
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
type LinkWrapperProps = {
    href: string;
    disabled?: boolean;
    children: any[] | any;
    className?: string;
};
const LinkWrapper = (props: LinkWrapperProps) => {
    if (props.disabled) return <>{props.children}</>;

    return (
        <Link href={props.href}>
            <a className={props.className}>{props.children}</a>
        </Link>
    );
};

const PostHeader = (props: Props) => {
    const config = useContext(PostConfig);

    return (
        <HeaderStyle>
            <LinkWrapper
                href={`/${props.data.subreddit}`}
                className="icon-link"
                disabled={config.disableSubredditLink}
            >
                <SubredditIcon subreddit={props.data.subreddit} size={45} />
            </LinkWrapper>
            <SubInfo>
                <h1>
                    <LinkWrapper
                        disabled={config.disableSubredditLink}
                        href={`/${props.data.subreddit}`}
                    >
                        {props.data.subreddit}
                    </LinkWrapper>
                </h1>
                <p className="post-overlay">
                    Posted by{" "}
                    <Link href={`/u/${props.data.author}`}>
                        <a>u/{props.data.author}</a>
                    </Link>{" "}
                    {"\u2022"} {parseDate(props.data.created)} ago
                </p>
            </SubInfo>
            <div className="space"></div>
            <PostMore data={props.data} />
        </HeaderStyle>
    );
};

export default PostHeader;
