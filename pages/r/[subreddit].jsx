import cookies from "next-cookies";
import { useRouter } from "next/router";
import PostsList from "../../components/PostsList";
import { prefix } from "../../constants/endpoints";
import { getPosts } from "../../repository/reddit_api";

const Subreddit = (props) => {
    const router = useRouter();

    console.log(router.query.subreddit);
    return (
        <div className="layout">
            <PostsList
                endpoint={props.endpoint}
                initialData={{
                    pageParams: null,
                    pages: [props.data || undefined],
                }}
            />
        </div>
    );
};

/**
 * @type {import("next").GetServerSideProps}
 */
export const getServerSideProps = async (ctx) => {
    let result;
    const { token } = cookies(ctx);

    try {
        const postData = await getPosts(
            token,
            `${prefix}/r/${ctx.params.subreddit}/best`,
            null
        );
        result = postData;
    } catch (error) {
        console.log("Error Getting Subreddit Info", error);
    }

    return {
        props: {
            data: result || null,
            endpoint: `${prefix}/r/${ctx.params.subreddit}/best`,
        },
    };
};

export default Subreddit;
