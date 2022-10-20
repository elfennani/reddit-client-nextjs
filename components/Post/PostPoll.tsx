import { CheckCircleFilled } from "@ant-design/icons";
import React, { useState } from "react";
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

    > button:not(:last-child) {
        margin-bottom: 8px;
    }
`;

const PollOption = styled.button<{ selected: boolean; choosen: boolean }>`
    background: ${(p) =>
        p.selected
            ? p.theme.text
            : p.choosen
            ? p.theme.primary
            : "transparent"};
    color: ${(p) =>
        p.selected ? p.theme.background : p.choosen ? "white" : p.theme.text};
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 16px;
    border-radius: 7px;
    width: 100%;
    border: none;
    font-family: ${(p) => p.theme.fontFamily};
    transition: background 0.2s;

    &:not(:disabled):hover {
        background: ${(p) => (p.choosen ? p.theme.primary : p.theme.text25)};
    }

    .poll-votes {
        font-size: 0.8rem;
        opacity: 0.8;
        display: inline-block;
        padding: 2px 8px;
        background: ${(p) => (!p.selected ? p.theme.text : p.theme.background)};
        color: ${(p) => (!p.selected ? p.theme.background : p.theme.text)};
        border-radius: 50px;
    }
`;

const ChooseButton = styled.div<{ choosen: boolean }>`
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 2px solid white;
    background: ${(p) => (p.choosen ? p.theme.primary : "white")};
`;

const PostPoll = ({ pollData }: Props) => {
    const [selectedOption, setSelectedOption] = useState(
        pollData.options[0].id
    );

    return (
        <PollStyle>
            {pollData.options.map((opt) => (
                <PollOption
                    key={opt.id}
                    selected={pollData.selection == opt.id}
                    onClick={setSelectedOption.bind(this, opt.id)}
                    disabled={!!pollData.selection}
                    choosen={!pollData.selection && selectedOption == opt.id}
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
            {!pollData.selection && <button>vote</button>}
        </PollStyle>
    );
};

export default PostPoll;
