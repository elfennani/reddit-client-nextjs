import React from "react";
import PropTypes from "prop-types";
import styles from "./PostView.module.scss";
import Card from "../Card";
import { parseDate } from "../../utils/functions";
import {
    CaretDownOutlined,
    CaretUpOutlined,
    LogoutOutlined,
    SaveFilled,
    ShareAltOutlined,
} from "@ant-design/icons";
import Link from "next/link";

/**
 * @typedef PostProps
 * @property {{name: string, picture: string, link: string}} subreddit
 * @property {string} creator
 * @property {number} createdOn
 * @property {string} creatorLink
 * @property {number} votes
 * @property {number} commentCount
 * @property {string} image
 * @property {string} title
 * @property {string} text
 * @property {("upvoted"|"downvoted"|null)} voteState
 * @property {string} extPostLink
 * @property {VoidFunction} onUpvote,
 * @property {VoidFunction} onDownvote,
 * @property {VoidFunction} onSave,
 * @property {VoidFunction} onShare,
 */

/**
 *
 * @param {PostProps} props
 * @returns {React.Component}
 */
const PostView = (props) => {
    return (
        <Card className={styles.container}>
            <header>
                <img src={props.subreddit.picture} alt={props.subreddit.name} />
                <div>
                    <Link href={props.subreddit.link}>
                        <a>
                            <h2>{props.subreddit.name}</h2>
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
                    <Link href={props.extPostLink}>
                        <a>
                            <LogoutOutlined rotate={-45} />
                        </a>
                    </Link>
                )}
            </header>
            <div className={styles.content}>
                {props.image && <img src={props.image} alt={props.title} />}
                <h2>{props.title}</h2>
                {props.text && <p className={styles.text}>{props.text}</p>}
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
                        <button
                            className={[
                                styles.squared,
                                props.voteState == "upvoted"
                                    ? styles.upvoted
                                    : null,
                            ].join(" ")}
                            onClick={props.onUpvote}
                        >
                            <CaretUpOutlined />
                        </button>
                        <button
                            className={[
                                styles.squared,
                                props.voteState == "downvoted"
                                    ? styles.downvoted
                                    : null,
                            ].join(" ")}
                            onClick={props.onDownvote}
                        >
                            <CaretDownOutlined />
                        </button>
                    </div>
                    <div>
                        <button onClick={props.onShare}>
                            <ShareAltOutlined /> <p>Share</p>
                        </button>
                        <button onClick={props.onSave}>
                            <SaveFilled /> <p>Save</p>
                        </button>
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
    subreddit: PropTypes.shape({
        name: PropTypes.string,
        picture: PropTypes.string,
        link: PropTypes.string,
    }).isRequired,
    creator: PropTypes.string,
    createdOn: PropTypes.number,
    creatorLink: PropTypes.string,
    title: PropTypes.string,
    text: PropTypes.string,
    image: PropTypes.string,
    link: PropTypes.string,
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
