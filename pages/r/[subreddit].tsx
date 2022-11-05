import { GetServerSideProps } from "next";
import cookies from "next-cookies";
import { useRouter } from "next/router";
import SubredditLayout from "../../components/PageLayouts/SubredditLayout";
import PostsList from "../../components/PostsList";
import { anon_prefix, prefix } from "../../constants/endpoints";
import { getPosts } from "../../repository/reddit_api";
import { PostData } from "../../types/types";

interface SubredditPageProps {
    endpoint: string;
    data: PostData[];
}

const Subreddit = (props: SubredditPageProps) => {
    const router = useRouter();
    const subredditName = router.query.subreddit;

    return (
        <SubredditLayout>
            <PostsList
                endpoint={props.endpoint}
                initialData={{
                    pageParams: null as unknown as unknown[],
                    pages: [props.data || undefined],
                }}
            />
        </SubredditLayout>
    );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    let result;
    const { token } = cookies(ctx);

    // if (!token)
    //     return {
    //         props: {},
    //     };

    try {
        const postData = await getPosts(
            token,
            `${token ? prefix : anon_prefix}/r/${ctx.params?.subreddit}/best`,
            null
        );
        result = postData;
    } catch (error) {
        console.error("Error Getting Subreddit Info", error);
    }

    return {
        props: {
            data: result || null,
            endpoint: `${prefix}/r/${ctx.params?.subreddit}/best`,
        },
    };
};

export default Subreddit;
