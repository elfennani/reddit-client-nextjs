import React from "react";
import styled from "styled-components";

export const Card = styled.div`
    /* overflow: hidden; */
    /* border: 1px solid rgba(0, 0, 0, 0.12); */
    border-radius: 12px;
    background-color: ${(props) => props.theme.cardBg};
    min-height: 16px;
    color: ${(props) => props.theme.text};
    box-shadow: 0px 12px 20px rgba(34, 57, 84, 0.07);
`;

export default Card;
