import Cookies from "js-cookie";
import cookies from "next-cookies";
import { getPostData } from "../../repository/reddit_api";

const Post = ({}) => {
    return <div></div>;
};

/**
 * @type {import("next").GetServerSideProps}
 */
export const getServerSideProps = async (ctx) => {
    const { token } = cookies(ctx);
    console.log(await getPostData(ctx.params.id, token));
    return {
        props: {},
    };
};

export default Post;
