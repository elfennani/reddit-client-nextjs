import { CompressOutlined, NodeCollapseOutlined } from "@ant-design/icons";
import { decode, encode } from "html-entities";
import React, { useContext, useEffect, useMemo, useState } from "react";
import styled, { ThemeContext } from "styled-components";
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
const CollapsedCommentStyle = styled.div`
    display: flex;
    position: relative;
    align-items: center;
    gap: 8px;

    &::after {
        content: "";
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(
            to left,
            ${(props) => props.theme.cardBg},
            transparent
        );
        width: 50px;
    }
`;
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
    const theme = useContext(ThemeContext);

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
                            <CompressOutlined style={{ color: theme.text }} />
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
            <CollapsedCommentStyle
                className={`${styles.collapsedComment} ${
                    depth == 0 ? "" : styles.reply
                }`}
                onClick={() => setCollapsed(false)}
            >
                <ProfilePicture user={author} size={24} />
                <p>{text}</p>
            </CollapsedCommentStyle>
        ),
        []
    );

    if (collapsed) return collapsedComment;

    return uncollapsedComment;
};

const CommentContainerParent = styled(Card)`
    padding: 16px;
    margin-bottom: 16px;

    p {
        margin: 0;
    }

    button {
        background: none;
        border: none;
    }

    ul {
        margin: 0;
        padding: 0;
        padding-left: 14px;
    }

    .reply {
        border-left: 1px solid rgba($color: #000000, $alpha: 0.07);
    }

    .header {
        opacity: 0.5;
        font-size: 0.8rem;
        margin-bottom: 4px;
    }

    .commentContainer {
        padding-left: 16px;
        .comment {
            padding: 8px 0;
            display: flex;
            gap: 12px;

            a {
                color: darkblue;
            }

            &.last {
                padding-bottom: 0;
            }

            > .content {
                flex: 1;
                padding-bottom: 10px;

                p:not(.header) {
                    margin: 6px 0;
                }

                &.last {
                    padding-bottom: 0;
                }
            }
        }
    }

    > .commentContainer {
        padding-left: 0;

        .comment {
            padding-top: 0;
        }
    }
`;

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
