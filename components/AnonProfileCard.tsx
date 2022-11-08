import { UserOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import { getLoginLink } from "../repository/reddit_api";
import Button from "./Button";

type Props = {};

const ProfileHeader = styled.div`
    height: 146px;
    position: relative;
    margin-bottom: 40px;
    background: ${(p) => p.theme.primaryLight};
    border-radius: 0 0 12px 12px;
`;

const ProfilePicture = styled.div`
    z-index: 2;
    position: absolute;
    border-radius: 24px;
    width: 80px;
    height: 80px;
    background-color: ${(props) => props.theme.backgroundDark};
    border: 2px solid white;
    bottom: 0;
    left: 24px;
    transform: translateY(50%);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.5rem;
    color: ${(p) => p.theme.text66};
    overflow: hidden;
`;

const Title = styled.h1`
    text-align: left;
    padding: 0 24px;
    padding-top: 8px;
    margin: 0;
    margin-bottom: 16px;
    font-size: 1.3125rem;
    font-weight: 600;
`;

const AnonButton = styled(Button)`
    margin: 24px;
    margin-top: 0;
    width: calc(100% - 48px);
    padding: 12px;
`;

const AnonProfileCard = (props: Props) => {
    const router = useRouter();
    return (
        <div>
            <ProfileHeader>
                <ProfilePicture>
                    <UserOutlined />
                </ProfilePicture>
            </ProfileHeader>
            <Title>Anonymous</Title>
            <AnonButton
                title="Login to reddit"
                onClick={() => router.push("/login")}
            >
                Login
            </AnonButton>
        </div>
    );
};

export default AnonProfileCard;
