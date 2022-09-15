import { useRouter } from "next/router";

const Subreddit = (props, n) => {
    const router = useRouter();
    console.log(router.query.subreddit);
    return <div></div>;
};

/**
 * @type {import("next").GetServerSideProps}
 */
export const getServerSideProps = async ({ params }) => {
    console.log(params.subreddit);
    return {
        props: {},
    };
};

export default Subreddit;
