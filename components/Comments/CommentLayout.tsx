import { CompressOutlined, NodeCollapseOutlined } from "@ant-design/icons";
import { decode, encode } from "html-entities";
import React, { useMemo, useState } from "react";
import { CommentData } from "../../types/types";
import { parseDate } from "../../utils/functions";
import Card from "../Card";
import ProfilePicture from "../ProfilePicture";
import styles from "./CommentLayout.module.scss";
import CommentsHandler from "./CommentsHandler";

interface CommentLayoutProps {
    replies?: CommentData[];
    depth: number;
    authorName: string;
    content: string;
    author: string;
    json: any;
    more?: string[];
    text: string;
    created: number;
    isOP: boolean;
}
const CommentLayoutContent: React.FC<CommentLayoutProps> = ({
    authorName,
    content,
    replies,
    author,
    depth,
    more,
    text,
    ...props
}) => {
    const [collapsed, setCollapsed] = useState<boolean>(false);

    const uncollapsedComment = useMemo(
        () => (
            <div className={styles.commentContainer}>
                <div className={`${styles.comment} ${styles.last}`}>
                    <div>
                        <ProfilePicture user={author} size={24} />
                    </div>
                    <div
                        className={`${styles.content} ${
                            !replies ? styles.last : ""
                        }`}
                    >
                        <p className={styles.header}>
                            u/{author}{" "}
                            {props.isOP && (
                                <span
                                    style={{
                                        color: "blue",
                                        fontWeight: "bold",
                                    }}
                                >
                                    OP
                                </span>
                            )}{" "}
                            • {parseDate(props.created)} ago
                        </p>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: decode(content),
                            }}
                        ></div>
                    </div>
                    <div>
                        <button onClick={() => setCollapsed(true)}>
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
        ),
        []
    );
    const collapsedComment = useMemo(
        () => (
            <div
                className={`${styles.collapsedComment} ${
                    depth == 0 ? "" : styles.reply
                }`}
                onClick={() => setCollapsed(false)}
            >
                <ProfilePicture user={author} size={24} />
                <p>{text}</p>
            </div>
        ),
        []
    );

    if (collapsed) return collapsedComment;

    return uncollapsedComment;
};

const CommentLayout: React.FC<CommentLayoutProps> = (props) => {
    if (props.depth == 0)
        return (
            <Card
                onDoubleClick={() => console.log(props.json)}
                className={styles.commentContainerParent}
            >
                <CommentLayoutContent {...props} />
            </Card>
        );

    return <CommentLayoutContent {...props} />;
};

export default CommentLayout;
