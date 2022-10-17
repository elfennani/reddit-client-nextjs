import "styled-components";

declare module "styled-components" {
    export interface DefaultTheme {
        fontFamily: string;
        primary: string;
        primaryLight: string;
        background: string;
        background0: string;
        backgroundDark: string;
        text: string;
        text25: string;
        text66: string;
        name: string;
        cardShadow: string;
        cardBg: string;
        downvote: string;
        downvoteLight: string;
        upvote: string;
        border: string;
        upvoteLight: string;
        votingButtonBg: string;
    }
}
