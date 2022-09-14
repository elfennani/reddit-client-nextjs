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
                    <CreatePost image="https://styles.redditmedia.com/t5_vjcux/styles/profileIcon_snoo4eb7f2fb-0e85-4c4d-8ec2-0ee989b23566-headshot-f.png?width=256&height=256&frame=1&crop=256:256,smart&s=ba057519c3932470fc6a56ba1ced07186fa40942" />
                    <PostsList />
                </div>
            </div>
        </div>
    );
};

export default Login;
