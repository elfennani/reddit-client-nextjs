import React from "react";
import Button from "../Button";
import styles from "./CommentLayout.module.scss";

interface Props {
    commentList: string[];
}

const CommentReadMore: React.FC<Props> = (props) => {
    return (
        <Button
            title="Read more"
            onClick={() => {}}
            secondary
            style={{ margin: 4, marginTop: 0 }}
        />
    );
};

export default CommentReadMore;
