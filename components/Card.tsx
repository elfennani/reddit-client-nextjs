import React from "react";
import styled from "styled-components";

export const CardStyle = styled.div<any>`
    overflow: hidden;
    border: 1px solid rgba(0, 0, 0, 0.12);
    border-radius: 8px;
    background-color: ${(props) => props.theme.cardBg};
    min-height: 16px;
    color: ${(props) => props.theme.text};
`;

const Card: React.FC<
    React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
    >
> = (props) => {
    return (
        <CardStyle {...props} style={props.style}>
            {props.children}
        </CardStyle>
    );
};

// Card.propType = HTMLDivElement;

export default Card;
