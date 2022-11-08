import Head from "next/head";
import React from "react";
import LoginCard from "../components/LoginCard";
import config from "../constants/config";
import endpoints from "../constants/endpoints";
import StandartLayout from "../components/PageLayouts/StandardLayout";
import { GetServerSideProps } from "next";
import { getLoginLink } from "../repository/reddit_api";

const Login = () => {
    return <div></div>;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    return {
        redirect: {
            destination: getLoginLink(),
            permanent: false,
        },
        props: {},
    };
};

export default Login;
