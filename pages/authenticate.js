import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import config from "../constants/config";
import endpoints from "../constants/endpoints";

const Authenticate = (props) => {
    const router = useRouter();
    useEffect(() => {
        document.cookie = `token=${
            props.access_token
        };path=/;expires=${new Date(
            Date.now() + props.expires_in * 1000
        ).toUTCString()}`;

        document.cookie = `refresh=${props.refresh_token}; path=/;`;

        setTimeout(() => {
            router.replace("/", undefined, {
                shallow: true,
            });
        }, 3000);
    }, []);

    return (
        <div>
            <Head>
                <title>Authenticating...</title>
            </Head>
            redirecting in 3 seconds...
        </div>
    );
};

/**
 * @type {import("next").GetServerSideProps}
 */
export const getServerSideProps = async (ctx) => {
    const code = ctx.query.code;

    if (code) {
        const body = {
            grant_type: "authorization_code",
            code,
            redirect_uri: config.redirectUri,
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
            return {
                props: await response.json(),
            };
        }
    }

    return {
        redirect: {
            permanent: false,
            destination: "/",
        },
    };
};

export default Authenticate;
