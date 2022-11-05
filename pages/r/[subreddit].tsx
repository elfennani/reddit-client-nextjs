import { GetServerSideProps } from "next";
import cookies from "next-cookies";
import { useRouter } from "next/router";
import { useMemo } from "react";
import SubredditLayout from "../../components/PageLayouts/SubredditLayout";
import PostsList from "../../components/PostsList";
import mainEndpoints, { anon_prefix, prefix } from "../../constants/endpoints";
import PostConfig from "../../contexts/PostConfig";
import { getPosts } from "../../repository/reddit_api";
import { PostData, PostsListEndpoints } from "../../types/types";

interface SubredditPageProps {
    endpoint: string;
    data: PostData[];
}

const Subreddit = (props: SubredditPageProps) => {
    const router = useRouter();
    const subredditName = router.query.subreddit as string;

    const endpoints = useMemo<PostsListEndpoints>(
        () => [
            {
                name: "hot",
                anon_routing: mainEndpoints.anonymous.subreddit_sorting(
                    subredditName,
                    "hot"
                ),
                logged_routing: mainEndpoints.subreddit_sorting(
                    subredditName,
                    "hot"
                ),
            },
            {
                name: "new",
                anon_routing: mainEndpoints.anonymous.subreddit_sorting(
                    subredditName,
                    "new"
                ),
                logged_routing: mainEndpoints.subreddit_sorting(
                    subredditName,
                    "new"
                ),
            },
        ],
        []
    );

    return (
        <SubredditLayout>
            <PostConfig.Provider
                value={{
                    disableSubredditLink: true,
                    wrappedInLink: true,
                }}
            >
                <PostsList
                    endpoints={endpoints}
                    initialData={{
                        pageParams: null as unknown as unknown[],
                        pages: [props.data || undefined],
                    }}
                />
            </PostConfig.Provider>
        </SubredditLayout>
    );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    let result;
    const { token } = cookies(ctx);

    try {
        const postData = await getPosts(
            token,
            `${token ? prefix : anon_prefix}/r/${ctx.params?.subreddit}/hot`,
            null
        );
        result = postData;
    } catch (error) {
        console.error("Error Getting Subreddit Info", error);
    }

    return {
        props: {
            data: result || null,
            endpoint: `${prefix}/r/${ctx.params?.subreddit}/hot`,
        },
    };
};

export default Subreddit;
