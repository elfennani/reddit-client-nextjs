import "../styles/globals.scss";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import cookies from "next-cookies";
import config from "../constants/config";
import endpoints from "../constants/endpoints";
import Head from "next/head";
import TopNavigation from "../components/TopNavigation";
import AccountTemplate from "../components/AccountTemplate";
import PagesList from "../components/PagesList";
import {
    useQuery,
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";
import { getUserProfile } from "../repository/reddit_api";
import Account from "../components/Account";
import TokenContext from "../contexts/TokenContext";
import BottomNavigation from "../components/BottomNavigation";

const queryClient = new QueryClient();

function MyApp(props) {
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navBlacklist = ["/authenticate", "/login"];
    const [refreshing, setRefreshing] = useState(true);

    useEffect(() => {
        setRefreshing(true);
        if (props.logout) {
            Cookies.remove("token");
            Cookies.remove("refresh");
        }

        if (props.isNewToken) {
            Cookies.set("token", props.access_token, {
                expires: new Date(
                    Date.now() + props.expires_in * 1000
                ).toUTCString(),
            });
        }

        console.log(props);
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
        </TokenContext.Provider>
    );
}

MyApp.getInitialProps = async (props) => {
    const { token, refresh } = cookies(props.ctx);
    console.log(refresh);
    if (props.ctx.pathname == "/authenticate") return {};
    if (!token && refresh) {
        const body = {
            grant_type: "refresh_token",
            refresh_token: refresh,
        };
        const formData = new URLSearchParams(body);

        console.log(`Basic ${config.basicCredentials}`);
        console.log(formData);

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
