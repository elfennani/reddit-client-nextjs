import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import styles from "./TopNavigation.module.scss";
import { MenuOutlined, SearchOutlined } from "@ant-design/icons";
import styled, { ThemeContext } from "styled-components";
import ThemeSwitcher from "../../contexts/ThemeSwitcher";

interface TopNavigationProps {
    onToggleMenu(): void;
}

const TopNavigationStyle = styled.nav`
    background-color: ${(props) => props.theme.cardBg};
    color: ${(props) => props.theme.text};
`;

const TopNavigation: React.FC<TopNavigationProps> = (props) => {
    const [searchOpen, setSearchOpen] = useState(false);
    const theme = useContext(ThemeContext);
    const themeSwitcher = useContext(ThemeSwitcher);

    const searchToggleHandler = () => {
        setSearchOpen((state) => !state);
    };

    return (
        <TopNavigationStyle className={styles.navigation}>
            <div className={styles.layout}>
                <button className={styles.toggle} onClick={props.onToggleMenu}>
                    <MenuOutlined />
                </button>
                <h1 className={styles.logo}>Logo</h1>
                {/* <input
                    type="text"
                    className={[
                        styles.searchBox,
                        searchOpen ? styles.active : null,
                    ].join(" ")}
                    placeholder="Search here..."
                /> */}
                <button className={styles.toggle} onClick={searchToggleHandler}>
                    <SearchOutlined />
                </button>
                <button onClick={themeSwitcher}>
                    {theme.name == "dark" ? "Light" : "Dark"}
                </button>
            </div>
        </TopNavigationStyle>
    );
};

TopNavigation.propTypes = {};

export default TopNavigation;
