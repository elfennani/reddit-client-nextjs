import React from "react";
import styles from "./PagesList.module.scss";
import {
    HistoryOutlined,
    HomeFilled,
    HomeOutlined,
    LogoutOutlined,
    SaveFilled,
    SaveOutlined,
    SettingFilled,
    SettingOutlined,
    UserOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/router";

interface PagesList {
    children?: React.ReactNode;
    onChange(): void;
    activePage?: string;
}

const PagesList: React.FC<PagesList> = ({
    children,
    onChange,
    activePage = "/",
}) => {
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
            label: "profile",
            link: "/profile",
            activeCheck: ["/profile"],
            activeIcon: <UserOutlined />,
            inactiveIcon: <UserOutlined />,
        },
        {
            label: "history",
            link: "/history",
            activeCheck: ["/history"],
            activeIcon: <HistoryOutlined />,
            inactiveIcon: <HistoryOutlined />,
        },
        {
            label: "saved",
            link: "/saved",
            activeCheck: ["/saved"],
            inactiveIcon: <SaveOutlined />,
            activeIcon: <SaveFilled />,
        },
        {
            label: "settings",
            link: "/settings",
            activeCheck: ["/settings"],
            activeIcon: <SettingFilled />,
            inactiveIcon: <SettingOutlined />,
        },
        {
            label: "log out",
            link: "/logout",
            activeCheck: ["/logout"],
            activeIcon: <LogoutOutlined />,
            inactiveIcon: <LogoutOutlined />,
        },
    ];
    return (
        <div className={styles.container}>
            <ul>
                {pagesList.map((page, index) => {
                    let isActive;
                    if (router) {
                        isActive = page.activeCheck.includes(router.pathname);
                    } else {
                        isActive = page.activeCheck.includes(activePage);
                    }
                    return (
                        <li key={index}>
                            <Link href={page.link}>
                                <a
                                    className={isActive ? styles.active : ""}
                                    onClick={onChange}
                                >
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
        </div>
    );
};

export default PagesList;
