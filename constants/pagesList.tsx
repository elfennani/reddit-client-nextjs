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

export default [
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
