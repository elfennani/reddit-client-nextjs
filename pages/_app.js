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
import VotedPosts from "../contexts/VotedPosts";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
});

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp(props) {
    const router = useRouter();
    const preserveScroll = usePreserveScroll();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navBlacklist = ["/authenticate", "/login"];
    const [refreshing, setRefreshing] = useState(true);
    const [votedPosts, setVotedPosts] = useState({});

    /**
     * @type {import("../contexts/VotedPosts").SetPostValue}
     */
    const addVotedPost = (name, value) => {
        setVotedPosts((votedPosts) => ({ ...votedPosts, [name]: value }));
    };

    /**
     * @type {import("../contexts/VotedPosts").VotedPostsContext}
     */
    const config = {
        posts: votedPosts,
        setPostValue: addVotedPost,
    };

    useEffect(() => {
        setRefreshing(true);
        config.setPostValue();

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

        if (!token && !refresh && router.pathname != "/login") {
            router.push("/login");
            return;
        }

        setRefreshing(false);
    }, []);

    const onMenuToggleHandler = () => setIsMenuOpen((state) => !state);

    if (navBlacklist.includes(router.pathname)) {
        return <props.Component {...props.pageProps} />;
    }

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
        <TokenContext.Provider value={props.token}>
            <VotedPosts.Provider value={config}>
                <QueryClientProvider client={queryClient}>
                    <Head>Revirt</Head>
                    <TopNavigation onToggleMenu={onMenuToggleHandler} />
                    <div className={`sidebar ${isMenuOpen ? "open" : ""}`}>
                        <Account />
                        <span className="divider"></span>
                        <PagesList
                            activePage={router.pathname}
                            onChange={() => setIsMenuOpen(false)}
                        />
                    </div>
                    {isMenuOpen && (
                        <span
                            className="backdrop"
                            onClick={setIsMenuOpen.bind(this, false)}
                        ></span>
                    )}
                    <main className="content">
                        <props.Component {...props.pageProps} />
                    </main>
                    <div className="onMobile">
                        <BottomNavigation activePage={router.pathname} />
                    </div>
                </QueryClientProvider>
            </VotedPosts.Provider>
        </TokenContext.Provider>
    );
}

MyApp.getInitialProps = async (props) => {
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
