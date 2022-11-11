import Hls from "hls.js";
import { decode } from "html-entities";
import Image from "next/image";
import React, { useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import PostConfig from "../../contexts/PostConfig";
import { RedditVideoData } from "../../types/types";
import ImageContainer from "../ImageContainer";

type Props = {
    videoData: RedditVideoData;
    nsfw: boolean;
};

const Video = styled.video`
    width: calc(100% - 32px);
    max-height: 400px;
    background-color: black;
    margin: 16px;
    margin-top: 0;
    border-radius: 12px;
    position: relative;
    z-index: 2;
`;

const PostVideo = ({ videoData, nsfw }: Props) => {
    const redditVideoRef = useRef<HTMLMediaElement>();
    const config = useContext(PostConfig);

    useEffect(() => {
        if (!videoData || !redditVideoRef.current) return;
        if (Hls.isSupported()) {
            let hls = new Hls();
            hls.loadSource(videoData.hlsUrl);
            hls.attachMedia(redditVideoRef.current);

            return () => {
                hls.destroy();
            };
        } else if (
            redditVideoRef.current.canPlayType("application/vnd.apple.mpegurl")
        ) {
            redditVideoRef.current.src = videoData.hlsUrl;
        }
    }, []);
    if (!config.ignoreNSFW && nsfw && videoData.thumbnail) {
        const thumbnail = videoData.thumbnail;
        return (
            <ImageContainer
                image={decode(thumbnail.url)}
                blur={true}
                alt={thumbnail.title || "Video"}
                imageWidth={thumbnail.width}
                imageHeight={thumbnail.height}
                ignoreSize={false}
            />
        );
    }
    return <Video ref={redditVideoRef as any} controls></Video>;
};

export default PostVideo;
