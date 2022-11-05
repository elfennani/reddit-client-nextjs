import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import ProfileContext from "../contexts/ProfileContext";
import TokenContext from "../contexts/TokenContext";
import { getUserProfile } from "../repository/reddit_api";

type Props = {
    children?: any;
};

const ProfileProvider = (props: Props) => {
    const token = useContext(TokenContext);
    const { isLoading, isError, data, isSuccess } = useQuery(
        ["user", token],
        async () => await getUserProfile(token),
        {
            enabled: !!token,
        }
    );

    return (
        <ProfileContext.Provider value={token ? data ?? null : undefined}>
            {props.children}
        </ProfileContext.Provider>
    );
};

export default ProfileProvider;
