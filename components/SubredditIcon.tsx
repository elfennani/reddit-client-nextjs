import { useQuery } from "@tanstack/react-query";
import { contrastColor } from "contrast-color";
import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import Skeleton from "react-loading-skeleton";
import styled from "styled-components";
import TokenContext from "../contexts/TokenContext";
import { getSubredditInfo } from "../repository/reddit_api";
import Image from "next/image";

const SubredditImage = styled(Image)<{ size?: number; radius?: number }>`
    border-radius: ${(p) => p.radius || 12}px;
`;

interface ImageTemplateTypes {
    size: Number;
    bgColor?: string | null;
    radius?: number;
}
const ImageTemplate = styled.div<ImageTemplateTypes>`
    background-color: ${(props: any) => props.bgColor || "#0079D3"};
    width: ${(props: any) => props.size}px;
    height: ${(props: any) => props.size}px;
    border-radius: ${(p) => p.radius || 12}px;
    flex: unset !important;
    text-transform: capitalize;
    text-align: center;
    line-height: ${(props: any) => props.size}px;
    color: ${(props: any) =>
        contrastColor({ bgColor: props.bgColor || "#0079D3" })};
`;

interface SubredditIconTypes {
    subreddit: string;
    size?: number;
    radius?: number;
}
const SubredditIcon = ({
    subreddit,
    size = 32,
    radius,
}: SubredditIconTypes) => {
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
                radius={radius}
            >
                {subreddit.substring(2, 4)}
            </ImageTemplate>
        );

    return (
        <SubredditImage
            src={data.icon}
            alt={subreddit}
            width={size}
            height={size}
            placeholder="empty"
            radius={radius}
        />
    );
};

export default SubredditIcon;
