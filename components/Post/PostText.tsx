import { decode } from "html-entities";
import React from "react";
import styled from "styled-components";

type Props = {
    text: string;
    text_html: string;
    compact: boolean;
};

const TextStyle = styled.div``;
const CompactTextStyle = styled.p<{ capped: boolean }>`
    margin: 0;
    font-size: 1rem;
    opacity: 0.66;

    &::after {
        content: "${(p) => (p.capped ? "..." : "")}";
    }
`;

const PostText = (props: Props) => {
    if (props.compact) {
        let text = props.text;
        const cap = 200;
        let isCapped = false;
        if (props.text && props.text.length > cap) {
            isCapped = true;
            text = props.text.substring(0, cap);
        }
        return (
            <CompactTextStyle
                capped={isCapped}
                dangerouslySetInnerHTML={{
                    __html: decode(text),
                }}
            ></CompactTextStyle>
        );
    }
    return (
        <TextStyle
            dangerouslySetInnerHTML={{ __html: decode(props.text_html) }}
        ></TextStyle>
    );
};

export default PostText;
