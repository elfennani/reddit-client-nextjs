import React, { createContext, useContext } from "react";
import styled from "styled-components";

type Props = {
    children: any[];
    onChoose(link: string): void;
    current: string;
    onRefresh(): void;
    isAnon: boolean;
};

const SortContext = createContext<{
    onChoose: (link: string) => void;
    current: string;
    onRefresh(): void;
    isAnon: boolean;
}>({
    current: "",
    onChoose: (link: string) => {},
    onRefresh: () => {},
    isAnon: true,
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
            value={{
                current: props.current,
                onChoose: props.onChoose,
                onRefresh: props.onRefresh,
                isAnon: props.isAnon,
            }}
        >
            <SortList>{props.children}</SortList>
        </SortContext.Provider>
    );
};

const SortListItem = styled.li<{ active: boolean }>`
    button {
        padding: 8px 16px;
        border-radius: 7px;
        border: none;
        font-size: 1rem;
        font-family: ${(p) => p.theme.fontFamily};
        text-transform: capitalize;
        color: ${(props) =>
            props.active ? props.theme.background : props.theme.text25};
        letter-spacing: 1.2px;
        font-weight: 600;
        position: relative;
        background-color: ${(props) =>
            props.active ? props.theme.primary : props.theme.cardBg};
        transition: all 0.15s;
        border: 1px solid
            ${(props) =>
                props.active ? "transparent" : props.theme.background};
    }
`;

interface TypeProps {
    title: string;
    onClick?(link: string): void;
    loggedLink: string;
    anonLink: string;
}
const Type: React.FC<TypeProps> = (props) => {
    const sortingContext = useContext(SortContext);
    const link = sortingContext.isAnon ? props.anonLink : props.loggedLink;

    return (
        <SortListItem active={sortingContext.current == link}>
            <button
                type="button"
                onClick={() =>
                    sortingContext.current == link
                        ? sortingContext.onRefresh()
                        : sortingContext.onChoose(link)
                }
            >
                {props.title}
            </button>
        </SortListItem>
    );
};

Sorting.Type = Type;

export default Sorting;
