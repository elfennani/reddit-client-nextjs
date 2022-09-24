import React from "react";
import PropTypes from "prop-types";
import styles from "./BottomNavigation.module.scss";
import Card from "../Card.tsx";
import {
    HomeFilled,
    HomeOutlined,
    NotificationFilled,
    NotificationOutlined,
    PlusSquareFilled,
    PlusSquareOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/router";

const BottomNavigation = ({ activePage = "/" }) => {
    const router = useRouter();
    /**
     * @type {[{label:string, link:string, activeCheck:string[], activeIcon:React.Component, inactiveIcon:React.Component}]}
     */
    const pagesList = [
        {
            label: "home",
            link: "/",
            activeCheck: ["/"],
            activeIcon: <HomeFilled />,
            inactiveIcon: <HomeOutlined />,
        },
        {
            label: "Create Post",
            link: "/post",
            activeCheck: ["/post"],
            activeIcon: <PlusSquareFilled />,
            inactiveIcon: <PlusSquareOutlined />,
        },
        {
            label: "Notifications",
            link: "/notification",
            activeCheck: ["/notification"],
            activeIcon: <NotificationFilled />,
            inactiveIcon: <NotificationOutlined />,
        },
    ];
    return (
        <nav className={styles.container}>
            <ul>
                {pagesList.map((page, index) => {
                    let isActive;
                    if (router) {
                        isActive = page.activeCheck.includes(router.pathname);
                    } else {
                        isActive = page.activeCheck.includes(activePage);
                    }
                    return (
                        <li
                            key={index}
                            className={isActive ? styles.active : null}
                        >
                            <Link href={page.link}>
                                <a>
                                    {isActive
                                        ? page.activeIcon
                                        : page.inactiveIcon}
                                    {page.label}
                                </a>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

BottomNavigation.propTypes = {};

export default BottomNavigation;
