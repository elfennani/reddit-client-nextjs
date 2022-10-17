import { LinkOutlined } from "@ant-design/icons";
import React from "react";
import styled from "styled-components";

type Props = {
    url: string;
};

const PostLinkStyle = styled.a`
    display: block;
    margin: 16px;
    background-color: ${(p) => p.theme.background};
    padding: 16px;
    border-radius: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;

    .link-container {
        overflow: hidden;
        white-space: nowrap;
        position: relative;
        flex: 1;

        &::after {
            content: "";
            display: block;
            position: absolute;
            top: 0;
            bottom: 0;
            right: 0;
            width: 100px;
            background: linear-gradient(
                to left,
                ${(p) => p.theme.background},
                ${(p) => p.theme.background0}
            );
        }
    }
`;

const PostLink = (props: Props) => {
    return (
        <PostLinkStyle
            href={props.url}
            target="_blank"
            title={props.url}
            onClick={(e) => e.stopPropagation()}
        >
            <div className="link-container">
                <span>{props.url}</span>
            </div>
            <LinkOutlined />
        </PostLinkStyle>
    );
};

export default PostLink;
