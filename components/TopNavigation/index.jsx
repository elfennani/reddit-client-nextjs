import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./TopNavigation.module.scss";
import { MenuOutlined, SearchOutlined } from "@ant-design/icons";

const TopNavigation = (props) => {
    const [searchOpen, setSearchOpen] = useState(false);

    const searchToggleHandler = () => {
        setSearchOpen((state) => !state);
    };

    return (
        <nav className={styles.navigation}>
            <div className={styles.layout}>
                <button className={styles.toggle} onClick={props.onToggleMenu}>
                    <MenuOutlined />
                </button>
                <h1 className={styles.logo}>Logo</h1>
                <input
                    type="text"
                    className={[
                        styles.searchBox,
                        searchOpen ? styles.active : null,
                    ].join(" ")}
                    placeholder="Search here..."
                    disabled={window.outerWidth <= 786 ? !searchOpen : false}
                />
                <button className={styles.toggle} onClick={searchToggleHandler}>
                    <SearchOutlined />
                </button>
            </div>
        </nav>
    );
};

TopNavigation.propTypes = {};

export default TopNavigation;
