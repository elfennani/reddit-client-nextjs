import cookies from "next-cookies";
import Head from "next/head";
import TopNavigation from "../components/TopNavigation";

const Login = ({}) => {
    return (
        <div>
            <Head>
                <title>Home Page</title>
            </Head>
            <TopNavigation />
        </div>
    );
};

export default Login;
