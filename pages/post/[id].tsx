import { GetServerSideProps } from "next";
import cookies from "next-cookies";
import React from "react";
import CommentsList from "../../components/CommentsList";
import PostHandler from "../../components/PostHandler";
import { getPostData, PostData } from "../../repository/reddit_api";

interface PostProps {
    data: PostData;
}
const Post: React.FC<PostProps> = ({ data }) => {
    return (
        <div className="layout">
            <PostHandler
                key={data.name}
                postData={data}
                ignoreNSFW={true}
                ignoreImageSize={true}
            />
            <hr />
            <CommentsList postName={data.name} />
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { token } = cookies(ctx);

    if (!ctx.params) return { props: {} };

    return {
        props: {
            data: await getPostData(ctx.params.id as string, token),
        },
    };
};

export default Post;
