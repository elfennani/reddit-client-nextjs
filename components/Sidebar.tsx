import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import SidebarContext from "../contexts/SidebarContext";
import TokenContext from "../contexts/TokenContext";
import Hr from "./Hr";
import Layout from "./Layout";
import PagesList from "./PagesList";
import ProfileCard from "./ProfileCard";

const SidebarStyle = styled.aside`
    background-color: ${(p) => p.theme.cardBg};
    border-radius: 12px;
    box-shadow: ${(p) => p.theme.cardShadow};
`;

const Backdrop = styled.div<{ active?: boolean }>`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: black;
    opacity: 0.25;
    display: ${(p) => (p.active ? "block" : "none !important")};
    z-index: 10;
`;

type Props = {
    active?: boolean;
};

const Sidebar = (props: Props) => {
    const sideBarContext = useContext(SidebarContext);
    const router = useRouter();
    const token = useContext(TokenContext);

    return (
        <>
            <SidebarStyle
                className={`sidebar ${sideBarContext.isOpened ? "active" : ""}`}
            >
                <ProfileCard />
                {token && (
                    <>
                        <Hr />
                        <PagesList
                            activePage={router.pathname}
                            onChange={sideBarContext.toggle}
                        />
                    </>
                )}
            </SidebarStyle>
            <Backdrop
                active={sideBarContext.isOpened}
                onClick={sideBarContext.toggle}
                className="backdrop"
            />
        </>
    );
};

export default Sidebar;
