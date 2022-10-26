import { GetServerSideProps } from "next";
import cookies from "next-cookies";
import Head from "next/head";
import React from "react";
import styled from "styled-components";
import CommentsList from "../../components/CommentsList";
import Hr from "../../components/Hr";
import Layout from "../../components/Layout";
import StandardLayout from "../../components/PageLayouts/StandardLayout";
import PostHandler from "../../components/PostHandler";
import PostConfig from "../../contexts/PostConfig";
import PostNameContext from "../../contexts/PostNameContext";
import { getPostData } from "../../repository/reddit_api";
import { PostData } from "../../types/types";

const PostListLayout = styled.div`
    width: 600px;
    margin: 0 auto;
    max-width: 100%;
`;

interface PostProps {
    data: PostData;
}
const Post: React.FC<PostProps> = ({ data }) => {
    return (
        <StandardLayout>
            <PostNameContext.Provider value={data.name}>
                <PostListLayout>
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
                    <Hr verticalSpacing={16} opacity={0.12} />
                    <CommentsList postName={data.name} />
                </PostListLayout>
            </PostNameContext.Provider>
        </StandardLayout>
    );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { token } = cookies(ctx);

    if (!ctx.params) return { props: {} };

    const data = await getPostData("t3_" + ctx.params.id, token);

    return {
        props: {
            data,
        },
    };
};

export default Post;
