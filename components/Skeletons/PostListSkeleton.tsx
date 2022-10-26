import React from "react";
import styled from "styled-components";
import PostViewSkeleton from "./PostViewSkeleton";

type Props = {};

const PostListSkeletonStyle = styled.div`
    display: flex;
    gap: 16px;
    flex-direction: column;

    > * {
        max-width: 600px;
        width: 100%;
        margin: 0 auto;
    }
`;

const PostListSkeleton = (props: Props) => {
    return (
        <PostListSkeletonStyle>
            <PostViewSkeleton image />
            <PostViewSkeleton text />
        </PostListSkeletonStyle>
    );
};

export default PostListSkeleton;
