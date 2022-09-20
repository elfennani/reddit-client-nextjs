import Cookies from "js-cookie";
import cookies from "next-cookies";
import { useEffect } from "react";
import PostHandler from "../../components/PostHandler";
import { getPostData } from "../../repository/reddit_api";

/**
 *
 * @param {{data:import("../../repository/reddit_api").PostData}} props
 * @returns
 */
const Post = ({ data }) => {
    return (
        <div className="layout">
            <PostHandler
                key={data.name}
                postData={data}
                ignoreNSFW={true}
                ignoreImageSize={true}
            />
        </div>
    );
};

/**
 * @type {import("next").GetServerSideProps}
 */
export const getServerSideProps = async (ctx) => {
    const { token } = cookies(ctx);

    return {
        props: {
            data: await getPostData(ctx.params.id, token),
        },
    };
};

export default Post;
