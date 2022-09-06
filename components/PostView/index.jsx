import React from "react";
import PropTypes from "prop-types";
import styles from "./PostView.module.scss";
import Card from "../Card";
import { parseDate } from "../../utils/functions";

/**
 * @typedef PostProps
 * @property {{name: string, picture: string}} subreddit
 * @property {string} creator
 * @property {number} createdOn
 */

/**
 *
 * @param {PostProps} props
 * @returns {React.Component}
 */
const PostView = (props) => {
    return (
        <Card>
            <header>
                <img src={props.subreddit.picture} alt={props.subreddit.name} />
                <div>
                    <h2>{props.subreddit.name}</h2>
                    <p>
                        Posted by {props.creator} {"\u2022"}{" "}
                        {parseDate(props.createdOn)}
                    </p>
                </div>
            </header>
        </Card>
    );
};

PostView.propTypes = {
    subreddit: PropTypes.shape({
        name: PropTypes.string,
        picture: PropTypes.string,
    }).isRequired,
    creator: PropTypes.string,
    createdOn: PropTypes.number,
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
    type: PropTypes.oneOf(["text", "image", "title", "video", "link"]),
};

export default PostView;
