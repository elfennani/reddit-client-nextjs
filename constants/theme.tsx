import { DefaultTheme } from "styled-components";

export const lightTheme: DefaultTheme = {
    fontFamily:
        "Outfit, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
    primary: "#FB5F40",
    primaryDark: "#E2563A",
    primary12: "rgba(251, 95, 64, 0.12)",
    background: "#EEF0F4",
    background0: "rgba(238, 240, 244, 0)",
    backgroundDark: "#E3E6ED",
    text: "#223954",
    text25: "rgba(34, 57, 84, 0.25)",
    text66: "rgba(34, 57, 84, 0.66)",
    primaryLight: "#FEE6E1",
    name: "light",
    cardShadow: "0px 12px 20px rgba(34, 57, 84, 0.07)",
    bottomSheetShadow: "0px -12px 20px rgba(34, 57, 84, 0.07)",
    cardBg: "#FFF",
    border: "rgba(0,0,0,0.07)",
    downvote: "#059FF6",
    downvoteLight: "#d7e6f0",
    upvote: "#FB5F40",
    upvoteLight: "#f6e6e3",
    votingButtonBg: "grey",
};

export const darkTheme: DefaultTheme = {
    ...lightTheme,
    name: "dark",
    background: "#1A1A24",
    text: lightTheme.background,
    text25: "rgba(238, 240, 244, 0.25)",
    text66: "rgba(238, 240, 244, 0.66)",
    cardBg: "#232333",
    primaryLight: "#392328",
    upvoteLight: "#392328",
    downvoteLight: "#172C41",
    backgroundDark: "#363640",
    border: "rgba(255,255,255,0.07)",
};
