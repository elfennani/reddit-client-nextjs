import { CommentData } from "../../repository/reddit_api";
import CommentLayout from "./CommentLayout";

const CommentsHandler: React.FC<{ commentData: CommentData[] }> = ({
    commentData,
}) => {
    return (
        <>
            {commentData.map((comment) => (
                <CommentLayout
                    authorName={comment.name}
                    content={comment.content}
                    key={comment.name}
                    replies={comment.replies}
                    depth={comment.depth}
                />
            ))}
        </>
    );
};

export default CommentsHandler;
