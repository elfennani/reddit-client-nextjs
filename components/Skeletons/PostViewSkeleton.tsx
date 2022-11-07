import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import styled, { useTheme } from "styled-components";
import Card from "../Card";

type Props = { image?: boolean; text?: boolean };

const PostViewCard = styled(Card)`
    padding: 16px;

    * {
        display: block;
    }

    .post-skeleton-header {
        display: flex;
        gap: 16px;
        align-items: center;
        margin-bottom: 16px;

        > div {
            flex: 1;

            > :first-child {
                margin-bottom: 8px;
            }
        }
    }

    .skeleton-mb {
        margin-bottom: 16px;
    }
    .skeleton-mb-text {
        margin-bottom: 8px;
    }
`;

const PostViewSkeleton = (props: Props) => {
    const theme = useTheme();
    return (
        <SkeletonTheme
            borderRadius={12}
            baseColor={theme.background}
            highlightColor="rgba(255,255,255,0.5)"
            inline={true}
        >
            <PostViewCard>
                <div className="post-skeleton-header">
                    <Skeleton width={45} height={45} />
                    <div>
                        <Skeleton width={150} height={16} />
                        <Skeleton width={90} height={12} />
                    </div>
                    <Skeleton width={35} height={35} />
                </div>

                {props.image && (
                    <Skeleton
                        width="100%"
                        height={300}
                        className="skeleton-mb"
                    />
                )}
                <Skeleton height={18} className="skeleton-mb-text" />
                <Skeleton height={18} width="66%" />
                {props.text && (
                    <>
                        <div className="skeleton-mb"></div>
                        <Skeleton height={12} className="skeleton-mb-text" />
                        <Skeleton height={12} width="33%" />
                    </>
                )}
            </PostViewCard>
        </SkeletonTheme>
    );
};

export default PostViewSkeleton;
