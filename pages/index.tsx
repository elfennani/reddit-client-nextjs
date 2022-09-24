import Cookies from "js-cookie";
import cookies from "next-cookies";
import Head from "next/head";
import { useRouter } from "next/router";
import AccountTemplate from "../components/AccountTemplate";
import CreatePost from "../components/CreatePost";
import NotificationCard from "../components/NotificationCard";
import NotificationItem from "../components/NotificationCard/NotificationItem";
import PagesList from "../components/PagesList";
import PostsList from "../components/PostsList";
import TopNavigation from "../components/TopNavigation";
import styles from "../styles/Home.module.scss";

const Login = ({}) => {
    const router = useRouter();
    return (
        <div>
            <Head>
                <title>Home Page</title>
            </Head>
            <div className={styles.container}>
                <div className={styles.content}>
                    <CreatePost />
                    <PostsList />
                </div>
            </div>
        </div>
    );
};

export default Login;
