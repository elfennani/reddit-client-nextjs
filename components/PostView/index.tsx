import React from "react";
import PropTypes from "prop-types";
import styles from "./PostView.module.scss";
import Card from "../Card";
import { minimizeNumber, parseDate } from "../../utils/functions";
import {
    CaretDownOutlined,
    CaretUpOutlined,
    LinkOutlined,
    LogoutOutlined,
    SaveFilled,
    ShareAltOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import ImageContainer from "../ImageContainer/";
import SubredditIcon from "../SubredditIcon";
import { ImagesMetadata } from "../../repository/reddit_api";

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
}
const PostView: React.FC<PostViewProps> = (props) => {
    const router = useRouter();

    let textCapped = false;
    let text;
    if (props.text && props.text.length > 100) {
        textCapped = true;
        text = props.text.substring(0, 100);
    }

    return (
        <Link href={`/post/${props.name}`}>
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
                    <p>
                        <span
                            className={
                                props.voteState != null &&
                                props.voteState != null
                                    ? props.voteState == "upvoted"
                                        ? styles.upvoted
                                        : styles.downvoted
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
                    </p>
                    <div className={styles.buttonsRow}>
                        <div>
                            {props.onUpvote && (
                                <button
                                    className={[
                                        styles.squared,
                                        props.voteState == "upvoted"
                                            ? styles.upvoted
                                            : null,
                                    ].join(" ")}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        props.onUpvote();
                                    }}
                                >
                                    <CaretUpOutlined />
                                </button>
                            )}
                            {props.onDownvote && (
                                <button
                                    className={[
                                        styles.squared,
                                        props.voteState == "downvoted"
                                            ? styles.downvoted
                                            : null,
                                    ].join(" ")}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        props.onDownvote();
                                    }}
                                >
                                    <CaretDownOutlined />
                                </button>
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
        </Link>
    );
};

export default PostView;
