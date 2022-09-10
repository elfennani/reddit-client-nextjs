import App from "next/app";
import "../styles/globals.scss";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import cookies from "next-cookies";
import config from "../constants/config";
import endpoints from "../constants/endpoints";
import Head from "next/head";
import TopNavigation from "../components/TopNavigation";
import AccountTemplate from "../components/AccountTemplate";
import PagesList from "../components/PagesList";

function MyApp(props) {
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navBlacklist = ["/authenticate", "/login"];
    const [refreshing, setRefreshing] = useState(true);

    useEffect(() => {
        // alert(router.pathname);
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
        <>
            <Head>Revirt</Head>
            <TopNavigation onToggleMenu={onMenuToggleHandler} />
            <div className={`sidebar ${isMenuOpen ? "open" : ""}`}>
                <AccountTemplate isLoading onRefresh={() => {}} />
                <span className="divider"></span>
                <PagesList activePage={router.pathname} />
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
        </>
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
