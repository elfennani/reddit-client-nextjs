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

    .backdrop {
        display: block;
    }

    > div {
        position: relative;
        padding: 0 16px;

        > .sidebar {
            --wid: 360px;
            position: fixed;
            overflow: auto;
            z-index: 11;
            width: var(--wid);
            transition: left 0.2s ease-in-out;
            top: 16px;
            bottom: 16px;
            left: calc(-1 * var(--wid));
            border-radius: 12px;
            max-height: none;
            max-width: 80%;
            box-shadow: ${(p) => p.theme.cardShadow};
            .cover {
                border: 2px solid white;
            }

            &.active {
                left: 16px;
            }
        }
    }
`;

const Container = styled.div`
    margin-top: ${marginTop}px;
    margin-left: 0;

    @media screen and (max-width: 930px) {
        margin-left: 0;
    }
`;

const SubredditLayout = (props: Props) => {
    return (
        <StandardLayoutStyle>
            <TopNavigation showMenuButton={true} />
            <Layout>
                <Container>{props.children}</Container>
                <Sidebar />
            </Layout>
        </StandardLayoutStyle>
    );
};

export default SubredditLayout;
