import { GetServerSideProps } from "next";
import cookies from "next-cookies";
import Head from "next/head";
import React from "react";
import CommentsList from "../../components/CommentsList";
import Layout from "../../components/Layout";
import StandardLayout from "../../components/PageLayouts/StandardLayout";
import PostHandler from "../../components/PostHandler";
import PostConfig from "../../contexts/PostConfig";
import PostNameContext from "../../contexts/PostNameContext";
import { getPostData } from "../../repository/reddit_api";
import { PostData } from "../../types/types";

interface PostProps {
    data: PostData;
}
const Post: React.FC<PostProps> = ({ data }) => {
    return (
        <StandardLayout>
            <PostNameContext.Provider value={data.name}>
                <div>
                    <PostConfig.Provider
                        value={{
                            wrappedInLink: false,
                            textCompact: false,
                            ignoreNSFW: true,
                            ignoreImageSize: true,
                        }}
                    >
                        <Head>
                            <title>
                                {data.title} • {data.subreddit}
                            </title>
                        </Head>
                        <PostHandler key={data.name} postData={data} />
                    </PostConfig.Provider>
                    <div className="hr"></div>
                    <CommentsList postName={data.name} />
                </div>
            </PostNameContext.Provider>
        </StandardLayout>
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
