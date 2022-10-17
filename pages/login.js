import Head from "next/head";
import React from "react";
import LoginCard from "../components/LoginCard";
import config from "../constants/config";
import endpoints from "../constants/endpoints";
import StandartLayout from "../components/PageLayouts/StandardLayout";

const Login = () => {
    const params = {
        client_id: config.clientId,
        response_type: "code",
        state: "auth",
        redirect_uri: config.redirectUri,
        duration: "permanent",
        scope: [
            "identity",
            "edit",
            "flair",
            "history",
            "modconfig",
            "modflair",
            "modlog",
            "modposts",
            "modwiki",
            "mysubreddits",
            "privatemessages",
            "read",
            "report",
            "save",
            "submit",
            "subscribe",
            "vote",
            "wikiedit",
            "wikiread",
        ],
    };
    // ?client_id=DWY9af0IjWnRpN6wT0t0dg&response_type=TYPE&
    // state=RANDOM_STRING&redirect_uri=URI&duration=DURATION&scope=SCOPE_STRING

    const stringParams = Object.keys(params).reduce(
        (prev, current, index, array) =>
            `${prev}${current}=${params[current]}${
                index == array.length - 1 ? "" : "&"
            }`,
        ""
    );
    return (
        <div>
            <Head>
                <title>Login with Reddit</title>
            </Head>
            <LoginCard link={`${endpoints.authorization}?${stringParams}`} />
        </div>
    );
};

export default Login;
