import React from "react";
import styled from "styled-components";

// type Props = {};

const Button = styled.button`
    background-color: ${(p) => p.theme.primary};
    color: white;
    font-family: ${(p) => p.theme.fontFamily};
    border-radius: 7px;
    font-size: 1rem;
    font-weight: 600;
    text-transform: uppercase;
    padding: 8px 16px;
    border: none;
    transition: all 0.2s;

    &:hover {
        background-color: ${(p) => p.theme.primaryDark};
    }

    &:focus {
        box-shadow: 0 8px 10px ${(p) => p.theme.primary12};
    }
`;

export default Button;
