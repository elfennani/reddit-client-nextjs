import { useQuery } from "@tanstack/react-query";
import { da } from "date-fns/locale";
import { decode } from "html-entities";
import Cookies from "js-cookie";
import cookies from "next-cookies";
import { useContext } from "react";
import { useEffect } from "react";
import Card from "../../components/Card";
import PostHandler from "../../components/PostHandler";
import TokenContext from "../../contexts/TokenContext";
import {
    getCommentInfo as getComments,
    getPostData,
} from "../../repository/reddit_api";

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
            <hr />
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
