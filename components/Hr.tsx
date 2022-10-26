import styled from "styled-components";

const Hr = styled.div<{
    spacing?: number;
    verticalSpacing?: number;
    opacity?: number;
}>`
    height: 1px;
    width: calc(100% - (24px * 2));
    margin: ${(p) => p.verticalSpacing || 0}px ${(p) => p.spacing || 24}px;
    background-color: ${(p) => p.theme.text};
    opacity: ${(p) => p.opacity || 0.07};
`;

export default Hr;
