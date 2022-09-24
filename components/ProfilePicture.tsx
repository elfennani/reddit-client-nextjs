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

const ProfilePicture: React.FC<{ name: string; size?: number }> = ({
    name,
    size = 32,
}) => {
    const token = useContext(TokenContext);

    const { isLoading, isError, data, isSuccess } = useQuery(
        ["user", token],
        async () => await getUserProfile(token)
    );

    return isSuccess ? (
        <Image src={data.pfp} alt={data.username} size={size} />
    ) : (
        <Image size={size} />
    );
};

export default ProfilePicture;
