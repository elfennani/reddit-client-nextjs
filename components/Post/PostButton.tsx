import React, { Component } from "react";
import styled from "styled-components";

type Props = {
    onClick(e: any): void;
    icon: any;
    title: string;
    size?: number;
    vote?: boolean | null;
};

const getVoteColor = (
    colorUp: string,
    colorDown: string,
    colorNull: string,
    state: boolean | null
): string => {
    if (state == null) return colorNull;
    return state ? colorUp : colorDown;
};

const ButtonStyle = styled.button<{ size: number; vote: boolean | null }>`
    width: 35px;
    height: 35px;
    background-color: transparent;
    font-size: ${(p) => p.size}px;
    background-color: ${(p) =>
        getVoteColor(
            p.theme.primaryLight,
            p.theme.downvoteLight,
            p.theme.background,
            p.vote
        )};
    color: ${(p) =>
        getVoteColor(p.theme.primary, p.theme.downvote, p.theme.text, p.vote)};
    border: none;
    border-radius: 12px;
    transition: background-color 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        background-color: ${(p) =>
            getVoteColor(
                p.theme.primaryLight,
                p.theme.downvoteLight,
                p.theme.backgroundDark,
                p.vote
            )};
    }

    * {
        transition: color 0.2s;
    }
`;
const PostButton = (props: Props) => {
    return (
        <ButtonStyle
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                props.onClick(e);
            }}
            size={props.size || 18}
            vote={props.vote == undefined ? null : props.vote}
            title={props.title}
        >
            {props.icon}
        </ButtonStyle>
    );
};

export default PostButton;
