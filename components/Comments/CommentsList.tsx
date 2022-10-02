import { CommentData } from "../../types/types";
import CommentLayout from "./CommentLayout";
import CommentReadMore from "./CommentReadMore";

const CommentsHandler: React.FC<{ commentData: CommentData[] }> = ({
    commentData,
}) => {
    return (
        <>
            {commentData.map((comment) =>
                comment.content ? (
                    <CommentLayout
                        authorName={comment.name}
                        content={comment.content}
                        key={comment.name}
                        replies={comment.replies}
                        more={comment.more}
                        depth={comment.depth}
                        author={comment.author}
                        json={comment.json}
                        text={comment.text}
                    />
                ) : (
                    <CommentReadMore
                        commentList={comment.more as string[]}
                        id={comment.moreId as string}
                    />
                )
            )}
        </>
    );
};

export default CommentsHandler;
