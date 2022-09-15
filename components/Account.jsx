import React, { useContext } from "react";
import TokenContext from "../contexts/TokenContext";
import AccountTemplate from "./AccountTemplate";
import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../repository/reddit_api";
import { parseDate } from "../utils/functions";
import {
    formatDistanceToNow,
    formatDistanceToNowStrict,
    formatDuration,
    intervalToDuration,
} from "date-fns";

const Account = () => {
    const token = useContext(TokenContext);
    const {
        isLoading,
        isError,
        data,
        isSuccess,
        isFetching,
        isFetchedAfterMount,
    } = useQuery(["user", token], () => getUserProfile(token));

    if (isLoading || isFetching || isFetchedAfterMount)
        <AccountTemplate isLoading />;
    if (isError) <AccountTemplate errorMessage="Failed to get user data" />;

    if (isSuccess) {
        let duration = intervalToDuration({
            start: new Date(data.created * 1000),
            end: Date.now(),
        });

        duration =
            Object.keys(duration).length > 2
                ? Object.keys(duration).reduce(
                      (prev, curr, index) =>
                          index > 1
                              ? prev
                              : { ...prev, [curr]: duration[curr] },
                      {}
                  )
                : duration;
        return (
            <AccountTemplate
                username={data.username}
                fullname={data.fullname}
                karma={data.karma}
                age={formatDuration(duration)
                    .replace(" years", "y")
                    .replace(" months", "m")
                    .replace(" days", "day")}
                profilePicture={data.pfp}
                isLoading={false}
            />
        );
    }

    return <AccountTemplate isLoading />;
};

export default Account;
