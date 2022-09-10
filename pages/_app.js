import App from "next/app";
import "../styles/globals.scss";
import Router, { useRouter } from "next/router";
import { useEffect } from "react";
import Cookies from "js-cookie";
import cookies from "next-cookies";
import config from "../constants/config";
import endpoints from "../constants/endpoints";
import Head from "next/head";

function MyApp(props) {
    const router = useRouter();
    useEffect(() => {
        if (props.logout) {
            Cookies.remove("token");
            Cookies.remove("refresh");
        }

        if (props.isNewToken) {
            Cookies.set("token", props.access_token, {
                expires: new Date(Date.now() + props.expires_in * 1000),
            });
        }

        console.log(props);
        const { token, refresh } = Cookies.get();

        if (!token && !refresh && router.pathname != "/login") {
            router.push("/login");
        }
    }, []);

    return (
        <>
            <Head>Revirt</Head>
            <props.Component {...props.pageProps} />
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
