import React, { createContext, useContext } from "react";
import styled from "styled-components";

type Props = {
    children: any[];
    onChoose(link: string): void;
    current: string;
};

const SortContext = createContext<{
    onChoose: (link: string) => void;
    current: string;
}>({
    current: "",
    onChoose: (link: string) => {},
});

const SortList = styled.ul`
    display: flex;
    list-style: none;
    margin: 16px 0;
    padding: 0;
    gap: 8px;
`;

const Sorting = (props: Props) => {
    return (
        <SortContext.Provider
            value={{ current: props.current, onChoose: props.onChoose }}
        >
            <SortList>{props.children}</SortList>
        </SortContext.Provider>
    );
};

const SortListItem = styled.li<{ active: boolean }>`
    button {
        padding: 8px 16px;
        border-radius: 20px;
        border: none;
        color: ${(props) => (props.active ? props.theme.primary : "darkgray")};
        text-transform: uppercase;
        letter-spacing: 1.2px;
        font-weight: ${(props) => (props.active ? "bold" : "normal")};
        position: relative;
        background-color: ${(props) =>
            props.active ? props.theme.primaryLight : props.theme.cardBg};
        border: 1px solid
            ${(props) =>
                props.active ? props.theme.primary : props.theme.cardBgLight};
    }
`;

interface TypeProps {
    title: string;
    onClick?(link: string): void;
    link: string;
}
const Type: React.FC<TypeProps> = (props) => {
    const sortingContext = useContext(SortContext);
    return (
        <SortListItem active={sortingContext.current == props.link}>
            <button onClick={() => sortingContext.onChoose(props.link)}>
                {props.title}
            </button>
        </SortListItem>
    );
};

Sorting.Type = Type;

export default Sorting;
