import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import Account from "./Account";
import PagesList from "./PagesList";

type Props = {
    isMenuOpen: boolean;
    setIsMenuOpen(state: boolean): void;
};

const SidebarStyling = styled.aside<{ open: boolean }>`
    @import "../styles/mixins.scss";

    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    width: 300px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    background-color: ${(props) => props.theme.cardBg};
    border-right: 1px solid rgba($color: #000000, $alpha: 0.07);
    // padding-top: 42px;
    overflow-y: auto;
    z-index: 11;
    transition: left 0.3s ease-in-out;
    color: ${(props) => props.theme.text};

    @media screen and (max-width: 786px) {
        left: -300px;

        &.open {
            left: 0;
        }
    }

    .divider {
        display: block;
        height: 1px;
        width: 100%;
        background-color: rgba($color: #000000, $alpha: 0.07);
    }
`;

const Sidebar: React.FC<Props> = ({ isMenuOpen, setIsMenuOpen }) => {
    const router = useRouter();

    return (
        <SidebarStyling
            open={isMenuOpen}
            className={`sidebar ${isMenuOpen ? "open" : ""}`}
        >
            <Account />
            <span className="divider"></span>
            <PagesList
                activePage={router.pathname}
                onChange={() => setIsMenuOpen(false)}
            />
        </SidebarStyling>
    );
};

export default Sidebar;
