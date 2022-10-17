import React, { ReactElement } from "react";
import styled from "styled-components";
import Layout from "../Layout";
import Sidebar from "../Sidebar";
import TopNavigation from "../TopNavigation";

type Props = {
    children: any[] | any;
};

const marginTop = 94;

const StandardLayoutStyle = styled.div`
    .backdrop {
        display: none;
    }

    @media screen and (max-width: 930px) {
        .backdrop {
            display: block;
        }
    }

    > div {
        position: relative;
        padding: 0 16px;

        > .sidebar {
            --wid: 360px;
            position: fixed;
            top: ${marginTop}px;
            max-height: calc(100vh - ${marginTop}px - 16px);
            overflow: auto;
            z-index: 11;
            width: var(--wid);
            transition: left 0.2s ease-in-out;

            @media screen and (max-width: 930px) {
                top: 0%;
                bottom: 0;
                left: calc(-1 * var(--wid));
                border-radius: 0;
                max-height: none;
                max-width: 80%;

                .cover {
                    border-radius: 0 0 12px 12px;
                }

                &.active {
                    left: 0;
                }
            }
        }
    }
`;

const Container = styled.div`
    margin-top: ${marginTop}px;
    margin-left: 376px;

    @media screen and (max-width: 930px) {
        margin-left: 0;
    }
`;

const StandartLayout = (props: Props) => {
    return (
        <StandardLayoutStyle>
            <TopNavigation />
            <Layout>
                <Container>{props.children}</Container>
                <Sidebar />
            </Layout>
        </StandardLayoutStyle>
    );
};

export default StandartLayout;
