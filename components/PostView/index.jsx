import React from "react";
import PropTypes from "prop-types";
import styles from "./PostView.module.scss";
import Card from "../Card";
import { parseDate } from "../../utils/functions";
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
import ImageContainer from "../ImageContainer";
import SubredditIcon from "../SubredditIcon";

/**
 * @typedef PostProps
 * @property {string} subreddit
 * @property {string} creator
 * @property {number} createdOn
 * @property {string} creatorLink
 * @property {number} votes
 * @property {number} commentCount
 * @property {string} image
 * @property {string} title
 * @property {string} text
 * @property {string} link
 * @property {string} linkThumbnail
 * @property {("upvoted"|"downvoted"|null)} voteState
 * @property {string} extPostLink
 * @property {string} postLink
 * @property {VoidFunction} onUpvote
 * @property {VoidFunction} onDownvote
 * @property {VoidFunction} onSav
 * @property {VoidFunction} onShare
 * @property {boolean} nsfw
 * @property {import("../../repository/reddit_api").ImagesMetadata[]} images
 */

/**
 *
 * @param {PostProps} props
 * @returns {React.Component}
 */
const PostView = (props) => {
    const router = useRouter();

    let textCapped = false;
    let text = props.text;
    if (text && props.text.length > 100) {
        textCapped = true;
        text = props.text.substring(0, 100);
    }

    return (
        <Card className={styles.container} onClick={() => router.push("/post")}>
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
                        blur={props.nsfw}
                    />
                )}
                {props.images && (
                    <ImageContainer
                        imagesMetadata={props.images}
                        blur={props.nsfw}
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
                            props.voteState != "none"
                                ? props.voteState == "upvoted"
                                    ? styles.upvoted
                                    : styles.downvoted
                                : null
                        }
                    >
                        {props.votes} vote
                        {props.votes.toString()[
                            props.votes.toString().length - 1
                        ] === "1"
                            ? ""
                            : "s"}
                    </span>{" "}
                    • {props.commentCount} comment
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
    );
};
PostView.defaultProps = {
    voteState: "none",
};
PostView.propTypes = {
    subreddit: PropTypes.string,
    creator: PropTypes.string,
    createdOn: PropTypes.number,
    creatorLink: PropTypes.string,
    title: PropTypes.string,
    text: PropTypes.string,
    image: PropTypes.string,
    link: PropTypes.string,
    linkThumbnail: PropTypes.string,
    votes: PropTypes.number,
    commentCount: PropTypes.number,
    onUpvote: PropTypes.func,
    onDownvote: PropTypes.func,
    onSave: PropTypes.func,
    onShare: PropTypes.func,
    postLink: PropTypes.string,
    extPostLink: PropTypes.string,
    voteState: PropTypes.oneOf(["upvoted", "downvoted", "none"]),
    type: PropTypes.oneOf(["text", "image", "title", "video", "link"]),
};

export default PostView;
