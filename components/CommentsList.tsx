import {
    LoadingOutlined,
    ReloadOutlined,
    RotateLeftOutlined,
} from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import styled from "styled-components";
import TokenContext from "../contexts/TokenContext";
import { getComments } from "../repository/reddit_api";
import CommentsHandler from "./Comments/CommentsHandler";
import CommentSkeleton from "./Skeletons/CommentSkeleton";

interface CommentsList {
    postName: string;
}
const CommentsHeader = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    padding: 0 16px;
    padding-right: 12px;

    h2 {
        font-size: 1.2rem;
        flex: 1;
        font-weight: 600;
        margin: 0;
    }
    button {
        width: 32px;
        height: 32px;
        border-radius: 32px;
        border: none;
        background: transparent;
        color: ${(p) => p.theme.text};
        transition: all 0.3s;

        &:hover {
            background: ${(p) => p.theme.text25};
        }
    }
`;

const CommentsList: React.FC<CommentsList> = ({ postName: name }) => {
    const token = useContext(TokenContext);

    const { data, isError, isLoading, error, refetch, isRefetching } = useQuery(
        ["comments", name, token],
        () => getComments(name, token)
    );

    return (
        <>
            <CommentsHeader>
                <h2>Comments</h2>
                <button
                    onClick={refetch as any}
                    type="button"
                    title="reload comments"
                >
                    {isRefetching ? <LoadingOutlined /> : <ReloadOutlined />}
                </button>
            </CommentsHeader>
            {isError && <p style={{ color: "red" }}>{`Error: ${error}`}</p>}
            {isLoading && <CommentSkeleton />}
            {data && <CommentsHandler commentData={data} />}
        </>
    );
};

export default CommentsList;
