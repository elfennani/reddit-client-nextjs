import { CheckCircleFilled } from "@ant-design/icons";
import React, { useMemo, useState } from "react";
import styled from "styled-components";
import { PollData } from "../../types/types";
import { minimizeNumber } from "../../utils/functions";
import Card from "../Card";

type Props = {
    pollData: PollData;
};

const PollStyle = styled(Card)`
    box-shadow: none;
    background: ${(p) => p.theme.background};
    margin: 16px;
    margin-top: 0;
    padding: 16px;
    display: flex;
    gap: 8px;
    flex-direction: column;
`;

type PollOptionsProps = {
    selected: boolean;
    choosen: boolean;
    percentage: number;
};

const PollOption = styled.button<PollOptionsProps>`
    background: transparent;
    color: ${(p) => p.theme.text};
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 16px;
    border-radius: 7px;
    width: 100%;
    border: none;
    font-family: ${(p) => p.theme.fontFamily};
    transition: background 0.2s;
    position: relative;
    overflow: hidden;
    font-weight: ${(p) => (p.selected ? "600" : "400")};

    &:not(:disabled):hover {
        background: ${(p) => (p.choosen ? p.theme.primary : p.theme.text25)};
        ${(p) => (p.choosen ? `color: white` : "")}
    }

    span {
        font-size: 18px;
    }

    .poll-votes {
        font-weight: 600;
        font-size: 0.8rem;
        opacity: 0.8;
        display: inline-block;
        padding: 2px 8px;
        background: ${(p) => p.theme.text};
        color: ${(p) => p.theme.background};
        border-radius: 50px;
    }

    > * {
        z-index: 2;
        position: relative;
    }

    &::before {
        content: "";
        display: block;
        background-color: ${(p) => p.theme.text25};
        width: ${(p) => p.percentage * 100}%;
        height: 100%;
        left: 0;
        top: 0;
        position: absolute;
        z-index: 1;
        border-radius: 0 7px 7px 0;
    }
`;

const ChooseButton = styled.div<{ choosen: boolean }>`
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 2px solid white;
    background: ${(p) => (p.choosen ? p.theme.primary : "white")};
`;

const VoteButton = styled.a`
    background-color: ${(p) => p.theme.primary};
    color: white;
    padding: 12px 16px;
    border-radius: 7px;
    border: none;
    font-family: ${(p) => p.theme.fontFamily};
    text-transform: uppercase;
    font-size: 0.9rem;
    letter-spacing: 1px;
    text-align: center;
`;

const PostPoll = ({ pollData }: Props) => {
    const [selectedOption, setSelectedOption] = useState(
        pollData.options[0].id
    );

    const total = useMemo(
        () =>
            pollData.options.reduce(
                (total, current) => total + (current.votes ?? 0),
                0
            ),
        [pollData]
    );

    const onChooseHandler = (option_id: string) => {
        setSelectedOption(option_id);
    };

    return (
        <PollStyle>
            {pollData.options.map((opt) => (
                <PollOption
                    key={opt.id}
                    selected={pollData.selection == opt.id}
                    onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        onChooseHandler(opt.id);
                    }}
                    disabled={!!pollData.selection}
                    choosen={!pollData.selection && selectedOption == opt.id}
                    percentage={(opt.votes ?? 0) / total}
                >
                    {!pollData.selection && (
                        <ChooseButton choosen={selectedOption == opt.id} />
                    )}
                    {opt.votes && (
                        <span className="poll-votes">
                            {minimizeNumber(opt.votes, 1)}
                        </span>
                    )}
                    {opt.text}
                    <div style={{ flex: 1 }}></div>
                    {pollData.selection != null &&
                        (pollData.selection == opt.id ? (
                            <CheckCircleFilled />
                        ) : (
                            <CheckCircleFilled
                                style={{ visibility: "hidden" }}
                            />
                        ))}
                </PollOption>
            ))}
            {!pollData.selection && (
                <VoteButton
                    href={pollData.poll_url}
                    target="_blank"
                    onClick={(e) => e.stopPropagation()}
                >
                    vote*
                </VoteButton>
            )}
        </PollStyle>
    );
};

export default PostPoll;
