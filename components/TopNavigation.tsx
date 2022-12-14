import { MenuOutlined, SearchOutlined } from "@ant-design/icons";
import Link from "next/link";
import React, { useContext, useRef } from "react";
import styled from "styled-components";
import NotificationsAPI from "../contexts/NotificationsAPI";
import ProfileContext from "../contexts/ProfileContext";
import SidebarContext from "../contexts/SidebarContext";
import TokenContext from "../contexts/TokenContext";
import Layout from "./Layout";
import ProfilePicture from "./ProfilePicture";
import SearchBox from "./SearchBox";
import ThemeSwitchButton from "./ThemeSwitchButton";

type Props = {
    showMenuButton?: boolean;
};

const TopNavigationStyle = styled.nav<Props>`
    height: 70px;
    background-color: ${(props) => props.theme.cardBg};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    box-shadow: 0px 12px 20px rgba(34, 57, 84, 0.07);
    z-index: 10;

    & > div {
        display: flex;
        justify-content: space-between;
        flex-direction: row;
        align-items: center;
        height: 70px;
        padding: 0 16px;
    }

    .row {
        display: flex;
        flex-direction: row;
        gap: 16px;
        align-items: center;
    }

    .menu-button {
        display: ${(p) => (p.showMenuButton ? "block" : "none")};
    }

    @media screen and (max-width: 930px) {
        .search-box {
            display: none;
        }
        .menu-button {
            display: block;
        }
    }
`;

const Logo = styled.h1`
    font-weight: 600;
    color: ${(props) => props.theme.text};
    font-size: 2rem;
    margin: 0;
    user-select: none;

    span {
        font-weight: 700;
        color: ${(props) => props.theme.primary};
    }
`;

const NavProfile = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 8px;
    gap: 8px;
    background: ${(props) => props.theme.background};
    border-radius: 12px;
    font-size: 0.875rem;

    img {
        border-radius: 7px;
    }

    @media screen and (max-width: 512px) {
        display: none;
    }
`;

const NavButton = styled.button`
    width: 40px;
    height: 40px;
    color: ${(props) => props.theme.text};
    background-color: ${(props) => props.theme.background};
    border: none;
    border-radius: 12px;
    transition: background-color 0.2s;

    &:hover {
        background-color: ${(p) => p.theme.backgroundDark};
    }
`;

const LeftSide = styled.div`
    display: flex;
    gap: 16px;
`;

const TopNavigation = (props: Props) => {
    const sideBarContext = useContext(SidebarContext);
    const notificationsApi = useContext(NotificationsAPI);
    const token = useContext(TokenContext);
    const searchInput = useRef<HTMLInputElement>();
    const index = useRef(0);
    const profile = useContext(ProfileContext);

    const testNotification = () => {
        console.log(searchInput.current);
        notificationsApi.notify(
            searchInput.current?.value || `Hello World ${index.current}`
        );
        index.current++;
    };

    return (
        <TopNavigationStyle showMenuButton={props.showMenuButton}>
            <Layout>
                <LeftSide>
                    <NavButton
                        onClick={sideBarContext.toggle}
                        className="menu-button"
                    >
                        <MenuOutlined />
                    </NavButton>
                    <Link href="/">
                        <a>
                            <Logo>
                                <span>Re</span>Virted
                            </Logo>
                        </a>
                    </Link>
                </LeftSide>
                <SearchBox ref={searchInput as any} />
                <div className="row">
                    <ThemeSwitchButton />
                    <NavButton onClick={testNotification}>
                        <SearchOutlined />
                    </NavButton>
                </div>
            </Layout>
        </TopNavigationStyle>
    );
};

export default TopNavigation;
