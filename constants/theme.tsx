import { DefaultTheme } from "styled-components";

export const lightTheme: DefaultTheme = {
    fontFamily:
        "Outfit, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
    primary: "#FB5F40",
    background: "#EEF0F4",
    background0: "rgba(238, 240, 244, 0)",
    backgroundDark: "#E3E6ED",
    text: "#223954",
    text25: "rgba(34, 57, 84, 0.25)",
    text66: "rgba(34, 57, 84, 0.66)",
    primaryLight: "#FEE6E1",
    name: "light",
    cardShadow: "0px 12px 20px rgba(34, 57, 84, 0.07)",
    cardBg: "#FFF",
    border: "black",
    downvote: "#059FF6",
    downvoteLight: "#d7e6f0",
    upvote: "#FB5F40",
    upvoteLight: "#f6e6e3",
    votingButtonBg: "grey",
};

export const darkTheme: DefaultTheme = { ...lightTheme, name: "dark" };
