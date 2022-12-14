import Hls from "hls.js";
import { decode } from "html-entities";
import Image from "next/image";
import React, { useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import InViewProvider from "../../contexts/InViewProvider";
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

const VideoPlaceholder = styled.div<{ height: number }>`
    height: ${(p) => p.height};
    max-height: 400px;
`;

const Thumbnail = styled.div<{ height: number }>`
    position: relative;
    height: ${(p) => p.height}px;
    max-height: 400px;
    background-color: black;
    margin: 16px;
    margin-top: 0;
    border-radius: 12px;
`;

const PostVideo = ({ videoData, nsfw }: Props) => {
    const redditVideoRef = useRef<HTMLMediaElement>();
    const config = useContext(PostConfig);
    const inView = useContext(InViewProvider);

    useEffect(() => {
        if (!videoData || !redditVideoRef.current || !inView) return;
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
    }, [inView]);

    if (!inView)
        return videoData.thumbnail ? (
            <Thumbnail height={videoData.height}>
                <Image
                    layout="fill"
                    width="100%"
                    src={decode(videoData.thumbnail?.url)}
                    height={"100%"}
                    objectFit="contain"
                    alt={videoData.thumbnail.title || "Video"}
                />
            </Thumbnail>
        ) : (
            <VideoPlaceholder height={videoData.height} />
        );

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
    return (
        <Video
            ref={redditVideoRef as any}
            controls
            height={videoData.height}
        ></Video>
    );
};

export default PostVideo;
