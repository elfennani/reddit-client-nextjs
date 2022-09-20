import { useQuery } from "@tanstack/react-query";
import { contrastColor } from "contrast-color";
import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import Skeleton from "react-loading-skeleton";
import styled from "styled-components";
import TokenContext from "../contexts/TokenContext";
import { getSubredditInfo } from "../repository/reddit_api";

const SubredditImage = styled.img`
    /* background-color: #dedede; */
    width: ${(props) => props.size}px;
    height: ${(props) => props.size}px;
    border-radius: 4px;
`;

const ImageTemplate = styled.div`
    background-color: ${(props) => props.bgColor || "#0079D3"};
    width: ${(props) => props.size}px;
    height: ${(props) => props.size}px;
    border-radius: 4px;
    flex: unset !important;
    text-transform: capitalize;
    text-align: center;
    line-height: ${(props) => props.size}px;
    color: ${(props) => contrastColor({ bgColor: props.bgColor || "#0079D3" })};
`;

/**
 *
 * @param {{subreddit:string}} param0
 * @returns
 */
const SubredditIcon = ({ subreddit, size = 32 }) => {
    const token = useContext(TokenContext);
    const { isLoading, isError, data, error } = useQuery(
        ["subreddit", "about", subreddit, token],
        () => getSubredditInfo(subreddit, token)
    );

    useEffect(() => {
        if (!error) return;
        console.log(error);
        return () => {};
    }, [error]);

    if (isLoading) return <Skeleton width={size} height={size} />;

    if (isError || !data.icon)
        return (
            <ImageTemplate
                size={size}
                bgColor={isError ? null : data.primary_color}
            >
                {subreddit.substring(2, 4)}
            </ImageTemplate>
        );

    return <SubredditImage src={data.icon} alt={subreddit} size={size} />;
};

export default SubredditIcon;
