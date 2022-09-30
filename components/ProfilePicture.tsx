import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import styled from "styled-components";
import TokenContext from "../contexts/TokenContext";
import { getUserProfile } from "../repository/reddit_api";

const Image = styled.img<{ size: number }>`
    background-color: #5b5b5b;
    border-radius: 4px;
    width: ${(props) => props.size}px;
    height: ${(props) => props.size}px;
    border: 1px solid rgba($color: #000000, $alpha: 0.15);
`;

const ProfilePicture: React.FC<{
    size?: number;
    user?: string | null;
}> = ({ size = 32, user = null }) => {
    const token = useContext(TokenContext);

    if (user == "[deleted]") return <Image size={size} />;

    const { isLoading, isError, data, isSuccess } = useQuery(
        ["user", token, user],
        async () => await getUserProfile(token, user)
    );

    return isSuccess ? (
        <Image src={data.pfp} alt={data.username} size={size} />
    ) : (
        <Image size={size} />
    );
};

export default ProfilePicture;
