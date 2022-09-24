import { CompressOutlined, NodeCollapseOutlined } from "@ant-design/icons";
import { decode } from "html-entities";
import React from "react";
import { CommentData } from "../../repository/reddit_api";
import Card from "../Card";
import ProfilePicture from "../ProfilePicture";
import styles from "./CommentLayout.module.scss";
import CommentsHandler from "./CommentsHandler";

interface CommentLayoutProps {
    replies?: CommentData[];
    depth: number;
    authorName: string;
    content: string;
}
const CommentLayoutContent: React.FC<CommentLayoutProps> = ({
    authorName,
    content,
    replies,
}) => {
    return (
        <div className={styles.commentContainer}>
            <div className={styles.comment}>
                <div>
                    <ProfilePicture name={authorName} size={24} />
                </div>
                <div
                    className={styles.content}
                    dangerouslySetInnerHTML={{ __html: decode(content) }}
                ></div>
                <div>
                    <button>
                        <CompressOutlined />
                    </button>
                </div>
            </div>
            {replies && (
                <div className={styles.reply}>
                    <CommentsHandler commentData={replies} />
                </div>
            )}
        </div>
    );
};
const CommentLayout: React.FC<CommentLayoutProps> = (props) => {
    if (props.depth == 0)
        return (
            <Card className={styles.commentContainerParent}>
                <CommentLayoutContent {...props} />
            </Card>
        );

    return <CommentLayoutContent {...props} />;
};

export default CommentLayout;
