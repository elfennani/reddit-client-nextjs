import Image from "next/image";
import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import ThemeSwitcher from "../contexts/ThemeSwitcher";

const Icon = styled(Image)`
    opacity: 0.75;
`;
const ThemeSwitchStyle = styled.button`
    width: 40px;
    height: 40px;
    background-color: ${(props) => props.theme.background};
    border: none;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const ThemeSwitchButton = () => {
    const theme = useContext(ThemeContext);
    const themeSwitcher = useContext(ThemeSwitcher);

    return (
        <ThemeSwitchStyle onClick={themeSwitcher}>
            <Icon
                src={theme.name == "light" ? "/sun.svg" : "/moon.svg"}
                alt="Dark Theme"
                width={18}
                height={18}
            />
        </ThemeSwitchStyle>
    );
};

export default ThemeSwitchButton;
