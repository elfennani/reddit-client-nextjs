import React from "react";
import PropTypes from "prop-types";
import styles from "./PostView.module.scss";
import { minimizeNumber, parseDate } from "../../utils/functions";
import {
    CaretDownOutlined,
    CaretUpOutlined,
    CheckOutlined,
    LinkOutlined,
    LogoutOutlined,
    SaveFilled,
    ShareAltOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import ImageContainer from "../ImageContainer/";
import SubredditIcon from "../SubredditIcon";
import { ImagesMetadata } from "../../types/types";
import Card from "../Card";
import styled from "styled-components";

interface PostViewProps {
    subreddit: string;
    creator: string;
    createdOn: number;
    creatorLink: string;
    votes: number;
    commentCount: number;
    image?: string;
    title: string;
    name: string;
    text?: string;
    link?: string;
    linkThumbnail?: string;
    voteState: "upvoted" | "downvoted" | null;
    extPostLink: string;
    postLink: string;
    onUpvote(): void;
    onDownvote(): void;
    onSave(): void;
    onShare(): void;
    nsfw?: boolean;
    images?: ImagesMetadata[];
    ignoreImageSize?: boolean;
    json: any;
    imageWidth?: number;
    imageHeight?: number;
    active: boolean;
}

const PostWrapper: React.FC<{ link: string; active: boolean; children: any }> =
    ({ link, active, children }) => {
        if (active) return <Link href={link}>{children}</Link>;

        return <>{children}</>;
    };

const InfoText = styled.p`
    font-size: 0.8rem;
    margin: 0;
    margin-bottom: 8px;
    color: ${(props) => props.theme.text};

    .upvoted {
        color: ${(props) => props.theme.primary} !important;
        font-weight: bold;
    }
    .downvoted {
        color: ${(props) => props.theme.downvote} !important;
        font-weight: bold;
    }
`;

const VotingButton = styled.button`
    background-color: ${(props) => props.theme.votingButtonBg};
    color: ${(props) => props.theme.text};

    &.upvoted {
        color: ${(props) => props.theme.upvote} !important;
        font-weight: bold;
        background-color: ${(props) => props.theme.upvoteLight} !important;
    }
    &.downvoted {
        color: ${(props) => props.theme.downvote} !important;
        font-weight: bold;
        background-color: ${(props) => props.theme.downvoteLight} !important;
    }
`;

const PostView: React.FC<PostViewProps> = (props) => {
    const router = useRouter();

    let textCapped = false;
    let text;
    if (props.text && props.text.length > 100) {
        textCapped = true;
        text = props.text.substring(0, 100);
    }

    return (
        <PostWrapper link={`/post/${props.name}`} active={props.active}>
            <Card className={styles.container}>
                <header>
                    {props.subreddit && (
                        <SubredditIcon subreddit={props.subreddit} />
                    )}
                    <div>
                        <Link href={"/" + props.subreddit}>
                            <a onClick={(e) => e.stopPropagation()}>
                                <h2>{props.subreddit}</h2>
                            </a>
                        </Link>
                        <p>
                            Posted by{" "}
                            <Link href={props.creatorLink}>
                                <a>{props.creator}</a>
                            </Link>{" "}
                            {"\u2022"} {parseDate(props.createdOn)}
                        </p>
                    </div>
                    {props.extPostLink && (
                        <a
                            href={props.extPostLink}
                            target="_blank"
                            title="Open in Reddit"
                            onClick={(e) => {
                                console.log(props.json);
                                e.stopPropagation();
                            }}
                        >
                            <LogoutOutlined rotate={-45} />
                        </a>
                    )}
                </header>
                <div className={styles.content}>
                    {props.image && (
                        <ImageContainer
                            image={props.image}
                            imageWidth={props.imageWidth}
                            imageHeight={props.imageHeight}
                            alt={props.title}
                            ignoreSize={props.ignoreImageSize}
                            blur={props.nsfw}
                        />
                    )}
                    {props.images && (
                        <ImageContainer
                            imagesMetadata={props.images}
                            blur={props.nsfw}
                            ignoreSize={props.ignoreImageSize}
                        />
                    )}
                    {props.link && (
                        <a
                            title={props.link}
                            className={styles.linkCard}
                            href={props.link}
                        >
                            <span>{props.link}</span> <LinkOutlined />
                        </a>
                    )}
                    <h2>{props.title}</h2>
                    {text && (
                        <p
                            className={[
                                styles.text,
                                textCapped ? styles.capped : null,
                            ].join(" ")}
                        >
                            {text}
                        </p>
                    )}
                </div>
                <div className={styles.toolbar}>
                    <InfoText>
                        <span
                            className={
                                props.voteState != null &&
                                props.voteState != null
                                    ? props.voteState == "upvoted"
                                        ? "upvoted"
                                        : "downvoted"
                                    : ""
                            }
                        >
                            {minimizeNumber(props.votes, 1)} vote
                            {props.votes.toString()[
                                props.votes.toString().length - 1
                            ] === "1"
                                ? ""
                                : "s"}
                        </span>{" "}
                        • {minimizeNumber(props.commentCount, 1)} comment
                        {props.commentCount.toString()[
                            props.commentCount.toString().length - 1
                        ] === "1"
                            ? ""
                            : "s"}
                    </InfoText>
                    <div className={styles.buttonsRow}>
                        <div>
                            {props.onUpvote && (
                                <VotingButton
                                    className={[
                                        styles.squared,
                                        props.voteState == "upvoted"
                                            ? "upvoted"
                                            : null,
                                    ].join(" ")}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        props.onUpvote();
                                    }}
                                >
                                    <CaretUpOutlined />
                                </VotingButton>
                            )}
                            {props.onDownvote && (
                                <VotingButton
                                    className={[
                                        styles.squared,
                                        props.voteState == "downvoted"
                                            ? "downvoted"
                                            : null,
                                    ].join(" ")}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        props.onDownvote();
                                    }}
                                >
                                    <CaretDownOutlined />
                                </VotingButton>
                            )}
                        </div>
                        <div>
                            {props.onShare && (
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        props.onShare();
                                    }}
                                >
                                    <ShareAltOutlined /> <p>Share</p>
                                </button>
                            )}
                            {props.onSave && (
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        props.onSave();
                                    }}
                                >
                                    <SaveFilled /> <p>Save</p>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </Card>
        </PostWrapper>
    );
};

export default PostView;
