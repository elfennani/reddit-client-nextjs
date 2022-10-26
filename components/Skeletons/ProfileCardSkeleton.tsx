import React from "react";
import Skeleton from "react-loading-skeleton";
import styled, { useTheme } from "styled-components";

type Props = {};

const Header = styled.div`
    position: relative;
    height: 146px;
    margin-bottom: 64px;

    .pfp-loader {
        position: absolute;
        border: 2px solid white;
        bottom: 0;
        left: 24px;
        transform: translateY(50%);
        z-index: 2;
        border-radius: 24px;
        overflow: hidden;

        > span {
            display: block;
        }

        > br {
            display: none;
        }
    }
`;

const Content = styled.div`
    padding: 0 24px;
`;

const ProfileCardSkeleton = (props: Props) => {
    const theme = useTheme();
    return (
        <>
            <Header>
                <Skeleton
                    width={"100%"}
                    height={146}
                    style={{ display: "block" }}
                    borderRadius={12}
                    baseColor={theme.primaryLight}
                    highlightColor={"white"}
                />
                <Skeleton
                    width={80}
                    height={80}
                    containerClassName="pfp-loader"
                />
            </Header>
            <Content>
                <Skeleton
                    width={"75%"}
                    height={24}
                    baseColor={theme.primaryLight}
                    highlightColor={"white"}
                    borderRadius={12}
                />
                <Skeleton
                    width={"45%"}
                    height={16}
                    baseColor={theme.primaryLight}
                    highlightColor={"white"}
                    borderRadius={12}
                    style={{ marginTop: 8, marginBottom: 24 }}
                />
            </Content>
        </>
    );
};

export default ProfileCardSkeleton;
