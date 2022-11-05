import Link from "next/link";
import React, { useContext } from "react";
import styled from "styled-components";
import PostConfig from "../contexts/PostConfig";
import { PostData } from "../types/types";
import Card from "./Card";
import ImageContainer from "./ImageContainer";
import PostButton from "./Post/PostButton";
import PostHeader from "./Post/PostHeader";
import PostText from "./Post/PostText";
import { GoArrowUp, GoArrowDown } from "react-icons/go";
import { ShareAltOutlined } from "@ant-design/icons";
import { minimizeNumber } from "../utils/functions";
import PostLink from "./Post/PostLink";
import { decode } from "html-entities";
import PostPoll from "./Post/PostPoll";
import { useRouter } from "next/router";

type Props = {
    data: PostData;
    onUpvote(): void;
    onDownvote(): void;
    voteState: boolean | null;
};
const TextContainer = styled.div`
    padding: 16px;
    padding-top: 0;

    > h2 {
        font-weight: 600;
        font-size: 1.2rem;
        margin: 0;
        margin-bottom: 8px;
    }
`;

const Footer = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 16px;
    align-items: center;
    padding-top: 0;
    gap: 8px;

    @media screen and (max-width: 360px) {
        flex-direction: column-reverse;
        align-items: flex-start;
    }

    .actions {
        display: flex;
        gap: 8px;
    }

    .info {
        color: ${(p) => p.theme.text66};
        font-weight: 600;
    }
`;

const Votes = styled.span<{ state: boolean | null }>`
    color: ${(p) =>
        p.state != null
            ? p.state
                ? p.theme.upvote
                : p.theme.downvote
            : "inherit"};
`;

const Note = styled.p`
    padding: 0 16px;
    font-size: 0.8rem;
`;

const parseVote = (
    ifUp: any,
    ifDown: any,
    ifNull: any,
    state: boolean | null
): any => {
    if (state == null) return ifNull;
    return state ? ifUp : ifDown;
};

const PostView = ({ data, ...props }: Props) => {
    const { ignoreImageSize, ignoreNSFW, textCompact } = useContext(PostConfig);

    return (
        <Card>
            <PostHeader data={data} />
            {data.image && (
                <ImageContainer
                    image={data.image}
                    imageHeight={data.imageHeight}
                    imageWidth={data.imageWidth}
                    blur={ignoreNSFW ? false : data.nsfw}
                    alt={data.title}
                    ignoreSize={ignoreImageSize}
                />
            )}
            {data.link && <PostLink url={data.link} />}
            <TextContainer>
                <h2>{decode(data.title)}</h2>
                {data.text && (
                    <PostText
                        text={data.text}
                        text_html={data.text_html as string}
                        compact={textCompact as boolean}
                    />
                )}
            </TextContainer>
            {data.poll && <PostPoll pollData={data.poll} />}
            {data.poll && data.poll.selection == null && (
                <Note>*Voting is not supported on 3rd party apps.</Note>
            )}
            <Footer>
                <div className="actions">
                    <PostButton
                        title="Upvote"
                        icon={<GoArrowUp />}
                        onClick={props.onUpvote}
                        size={24}
                        vote={props.voteState == true ? true : null}
                    />
                    <PostButton
                        icon={<GoArrowDown />}
                        title="Downvote"
                        onClick={props.onDownvote}
                        size={24}
                        vote={props.voteState == false ? false : null}
                    />
                    <PostButton
                        icon={<ShareAltOutlined />}
                        title="Share"
                        onClick={() => {}}
                    />
                </div>
                <div className="info">
                    <Votes state={props.voteState}>
                        {minimizeNumber(
                            data.votes + parseVote(1, -1, 0, props.voteState),
                            1
                        )}{" "}
                        votes
                    </Votes>{" "}
                    • {minimizeNumber(data.commentsCount, 1)} comments
                </div>
            </Footer>
        </Card>
    );
};

const PostViewWrapper = (props: Props) => {
    const { wrappedInLink } = useContext(PostConfig);
    const router = useRouter();

    if (!wrappedInLink) return <PostView {...props} />;

    const wrapperLink = `${router.pathname}?post_id=${props.data.name.replace(
        "t3_",
        ""
    )}${
        "&" +
        Object.entries(router.query).map(([key, value], index, array) => {
            return `${key}=${value}${index != array.length - 1 ? "&" : ""}`;
        })
    }`;

    return (
        <Link
            href={wrapperLink}
            as={`/post/${props.data.name.replace("t3_", "")}`}
            shallow={true}
        >
            <a>
                <PostView {...props} />
            </a>
        </Link>
    );
};

export default PostViewWrapper;
