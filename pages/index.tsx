import Cookies from "js-cookie";
import cookies from "next-cookies";
import Head from "next/head";
import { useRouter } from "next/router";
import CreatePost from "../components/CreatePost";
import NotificationCard from "../components/NotificationCard";
import NotificationItem from "../components/NotificationCard/NotificationItem";
import StandartLayout from "../components/PageLayouts/StandardLayout";
import PagesList from "../components/PagesList";
import PostsList from "../components/PostsList";

const Login = ({}) => {
    const router = useRouter();
    return (
        <StandartLayout>
            <Head>
                <title>Home Page</title>
            </Head>
            {/* <CreatePost /> */}
            <PostsList />
        </StandartLayout>
    );
};

export default Login;
