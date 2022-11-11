import React, { useContext } from "react";
import styled from "styled-components";
import PostConfig from "../../contexts/PostConfig";
import { PostData } from "../../types/types";
import ImageContainer from "../ImageContainer";
import PostHandler from "../PostHandler";
import PostCrosspost from "./PostCrosspost";
import PostLink from "./PostLink";
import PostVideo from "./PostVideo";

type Props = {
    data: PostData;
};

const IFrameWrapper = styled.div<{ ratio: number }>`
    margin: 16px;
    border-radius: 12px;
    overflow: hidden;
    position: relative;
    padding-bottom: ${(p) => p.ratio * 100}%;
    margin-top: 0;
    z-index: 2;

    iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
`;

const PostMedia = ({ data }: Props) => {
    const { ignoreNSFW, ignoreImageSize } = useContext(PostConfig);
    if (data.crosspost) return <PostCrosspost data={data.crosspost} />;
    if (data.image)
        return (
            <ImageContainer
                image={data.image}
                imageHeight={data.imageHeight}
                imageWidth={data.imageWidth}
                blur={ignoreNSFW ? false : data.nsfw}
                alt={data.title}
                ignoreSize={ignoreImageSize}
            />
        );
    if (data.images)
        return (
            <ImageContainer
                imagesMetadata={data.images}
                blur={ignoreNSFW ? false : data.nsfw}
                alt={data.title}
                ignoreSize={ignoreImageSize}
            />
        );
    if (data.youtubeIframe)
        return (
            <IFrameWrapper
                ratio={data.youtubeIframe.height / data.youtubeIframe.width}
            >
                <iframe
                    src={data.youtubeIframe.src}
                    frameBorder="0"
                    allow={data.youtubeIframe.allow}
                    allowFullScreen
                    title={data.youtubeIframe.title}
                ></iframe>
            </IFrameWrapper>
        );
    if (data.redditVideo)
        return <PostVideo videoData={data.redditVideo} nsfw={data.nsfw} />;

    return <PostLink url={data.link || ""} />;
};

export default PostMedia;
