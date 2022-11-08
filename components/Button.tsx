import React from "react";
import styled from "styled-components";

type Props = {
    secondary?: boolean;
};

const Button = styled.button<Props>`
    background-color: ${(p) => (p.secondary ? "transparent" : p.theme.primary)};
    color: ${(p) => (p.secondary ? p.theme.primary : "white")};
    font-family: ${(p) => p.theme.fontFamily};
    border-radius: 7px;
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;
    padding: 8px 16px;
    border: none;
    transition: all 0.2s;

    &:hover {
        background-color: ${(p) =>
            p.secondary ? p.theme.primary12 : p.theme.primaryDark};
    }

    &:focus {
        box-shadow: ${(p) =>
            p.secondary ? "none" : "0 8px 10px " + p.theme.primary12};
    }
`;

export default Button;
