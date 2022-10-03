import { GetServerSideProps } from "next";
import cookies from "next-cookies";
import React from "react";
import CommentsList from "../../components/CommentsList";
import PostHandler from "../../components/PostHandler";
import PostNameContext from "../../contexts/PostNameContext";
import { getPostData } from "../../repository/reddit_api";
import { PostData } from "../../types/types";

interface PostProps {
    data: PostData;
}
const Post: React.FC<PostProps> = ({ data }) => {
    return (
        <PostNameContext.Provider value={data.name}>
            <div className="layout">
                <PostHandler
                    key={data.name}
                    postData={data}
                    ignoreNSFW={true}
                    ignoreImageSize={true}
                    active={false}
                />
                <div className="hr"></div>
                <CommentsList postName={data.name} />
            </div>
        </PostNameContext.Provider>
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
