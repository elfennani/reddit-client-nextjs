import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import ThemeSwitcher from "../contexts/ThemeSwitcher";

const Icon = styled.img`
    width: 24px;
`;
const ThemeSwitchStyle = styled.button`
    display: grid;
    grid-template-columns: 48px 1fr;
    align-items: center;
    justify-items: center;
    height: 48px;
    background-color: transparent;
    border: none;
    color: ${(props) => props.theme.text};
    font-size: 1rem;
    font-weight: bold;
    gap: 8px;
    padding: 8px;
    position: absolute;
    bottom: 16px;
    left: 0;
    right: 0;
    width: 100%;
    opacity: 0.75;
    transition: all 0.2s ease-in-out;

    &:hover {
        opacity: 1;
        background-color: ${(props) =>
            props.theme.name == "light"
                ? "rgba(0,0,0, 0.07)"
                : "rgba(255,255,255, 0.03)"};
    }

    & > div {
        justify-self: baseline;
    }
`;
const ThemeSwitchButton = () => {
    const theme = useContext(ThemeContext);
    const themeSwitcher = useContext(ThemeSwitcher);

    return (
        <ThemeSwitchStyle onClick={themeSwitcher}>
            <Icon
                src={theme.name == "light" ? "/sun.svg" : "/moon.svg"}
                alt="Dark Theme"
            />
            <div>{theme.name == "light" ? "Light Theme" : "Dark Theme"}</div>
        </ThemeSwitchStyle>
    );
};

export default ThemeSwitchButton;
