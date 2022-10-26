import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import styled, { useTheme } from "styled-components";
import Card from "../Card";

type Props = {};

const CommentSkeletonStyle = styled(Card)`
    padding: 16px;
    display: flex;
    gap: 16px;

    > div {
        flex: 1;
    }

    .skeleton-mb {
        margin-bottom: 12px;
    }

    .skeleton-mb-2 {
        margin-bottom: 4px;
    }

    * {
        display: block;
        max-width: 100%;
    }
`;

const CommentSkeleton = (props: Props) => {
    const theme = useTheme();

    return (
        <SkeletonTheme
            borderRadius={12}
            baseColor={theme.background}
            highlightColor="rgba(255,255,255,0.66)"
        >
            <CommentSkeletonStyle>
                <Skeleton width={24} height={24} />
                <div>
                    <Skeleton width={150} className="skeleton-mb" height={14} />
                    <Skeleton className="skeleton-mb-2" />
                    <Skeleton width={250} />
                </div>
            </CommentSkeletonStyle>
        </SkeletonTheme>
    );
};

export default CommentSkeleton;
