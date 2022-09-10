import Head from "next/head";
import React from "react";
import LoginCard from "../components/LoginCard";
import endpoints from "../constants/endpoints";

const Login = () => {
    const params = {
        client_id: "DWY9af0IjWnRpN6wT0t0dg",
        response_type: "code",
        state: "auth",
        redirect_uri: "http://localhost:3000/authenticate",
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
