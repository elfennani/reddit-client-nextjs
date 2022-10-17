import "../styles/globals.scss";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import cookies from "next-cookies";
import config from "../constants/config";
import endpoints from "../constants/endpoints";
import Head from "next/head";
import TopNavigation from "../components/TopNavigation";
import PagesList from "../components/PagesList";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import {
    useQuery,
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";
import Account from "../components/Account";
import TokenContext from "../contexts/TokenContext";
import BottomNavigation from "../components/BottomNavigation";
import { usePreserveScroll } from "../hooks/usePreserveScroll";
import VotedPosts, { VotedPostsContext } from "../contexts/VotedPosts";
import { AppInitialProps } from "next/app";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "../constants/theme";
import ThemeSwitcher from "../contexts/ThemeSwitcher";
import DisableImageContext from "../contexts/DisableImageContext";
import useLocalStorageState from "use-local-storage-state";
import Layout from "../components/Layout";
import Sidebar from "../components/Sidebar";
import ProfileProvider from "../components/ProfileProvider";
import SidebarContext from "../contexts/SidebarContext";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
});

const GlobalStyle = createGlobalStyle`
    body{
        background-color: ${(props) => props.theme.background};
        min-height: 100vh;
        color: ${(props) => props.theme.text};
        font-family: ${(p) => p.theme.fontFamily};
        padding: 0;
        margin: 0;
    }
`;

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp(props: any) {
    const router = useRouter();
    const preserveScroll = usePreserveScroll();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [refreshing, setRefreshing] = useState(true);
    const [votedPosts, setVotedPosts] = useState({});

    const [theme, setTheme] = useLocalStorageState("theme", {
        defaultValue: "light",
    });

    const addVotedPost = (name: string, value: boolean | null) => {
        setVotedPosts((votedPosts) => ({ ...votedPosts, [name]: value }));
    };

    const config: VotedPostsContext = {
        posts: votedPosts,
        setPostValue: addVotedPost,
    };

    useEffect(() => {
        console.log(props);
        setRefreshing(true);

        if (props.logout) {
            Cookies.remove("token");
            Cookies.remove("refresh");
        }

        if (props.isNewToken) {
            Cookies.set("token", props.access_token, {
                expires: new Date(Date.now() + props.expires_in * 1000),
            });
            router.reload();
        }

        const { token, refresh } = Cookies.get();

        console.log(token, refresh);

        if (
            !token &&
            !refresh &&
            !["/login", "/authenticate"].includes(router.pathname)
        ) {
            router.push("/login", undefined, {});
        }
        setRefreshing(false);
    }, []);

    const onMenuToggleHandler = () => setIsMenuOpen((state) => !state);

    if (refreshing) {
        return (
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                }}
            >
                <p>Loading</p>
            </div>
        );
    }

    return (
        <ThemeSwitcher.Provider
            value={() =>
                setTheme((theme) => (theme == "light" ? "dark" : "light"))
            }
        >
            <ThemeProvider theme={theme == "dark" ? darkTheme : lightTheme}>
                <TokenContext.Provider value={props.token}>
                    <VotedPosts.Provider value={config}>
                        <DisableImageContext.Provider value={true}>
                            <QueryClientProvider client={queryClient}>
                                <ProfileProvider>
                                    <SidebarContext.Provider
                                        value={{
                                            isOpened: isMenuOpen,
                                            toggle: onMenuToggleHandler,
                                        }}
                                    >
                                        <GlobalStyle />
                                        <props.Component {...props.pageProps} />
                                    </SidebarContext.Provider>
                                </ProfileProvider>
                            </QueryClientProvider>
                        </DisableImageContext.Provider>
                    </VotedPosts.Provider>
                </TokenContext.Provider>
            </ThemeProvider>
        </ThemeSwitcher.Provider>
    );
}

MyApp.getInitialProps = async (props: any) => {
    const { token, refresh } = cookies(props.ctx);

    if (props.ctx.pathname == "/authenticate") return {};
    if (!token && refresh) {
        const body = {
            grant_type: "refresh_token",
            refresh_token: refresh,
        };
        const formData = new URLSearchParams(body);

        const response = await fetch(endpoints.access_token, {
            method: "POST",
            body: formData,
            headers: {
                Authorization: `Basic ${config.basicCredentials}`,
            },
        });

        if (response.status == 200) {
            return { ...(await response.json()), isNewToken: true };
        } else {
            return {
                logout: true,
            };
        }
    }

    if (!refresh) {
        return { logout: true };
    }

    return { token, refresh, isNewToken: false };
};
export default MyApp;
