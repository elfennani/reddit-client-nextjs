import { SearchOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import React, { useContext, useRef, useState } from "react";
import styled, { css } from "styled-components";
import TokenContext from "../contexts/TokenContext";
import SearchResults from "./SearchResults";

const SearchboxStyle = css`
    height: 40px;
    background-color: ${(props) => props.theme.background};
    width: 500px;
    max-width: 100%;
    border-radius: 12px;
    display: flex;
    padding: 0;
    border-bottom: none;

    > span {
        font-size: 18px;
        display: flex;
        width: 40px;
        align-items: center;
        justify-content: center;
        opacity: 0.33;
    }

    > p {
        line-height: 40px;
    }
    > input,
    p {
        flex: 1;
        background: transparent;
        border: none;
        outline: none;
        font-family: ${(props) => props.theme.fontFamily};
        color: ${(props) => props.theme.text};
        padding: 0;
        padding-right: 16px;
        margin: 0;
        text-align: left;

        &::placeholder {
            color: ${(p) => p.theme.text};
            opacity: 0.5;
        }
    }
`;

const SearchBoxButton = styled.button`
    ${SearchboxStyle}
    border: none;
    cursor: text;
    box-sizing: border-box;

    p {
        opacity: 0.5;
    }
`;

type SearchInput = {
    focused: boolean;
};

const focusedSearchInputCss = css`
    border-radius: 12px 12px 0 0;
    border: 1px solid ${(p) => p.theme.text25};
    border-bottom: none;
    /* box-shadow: inset 0 0 0 1px ${(p) => p.theme.text25}; */
`;

const SearchBoxInput = styled.div<SearchInput>`
    ${SearchboxStyle}
    ${(p) => p.focused && focusedSearchInputCss}
    position: relative;
`;

const SearchBox = React.forwardRef<HTMLInputElement>((props, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [searchValue, setSearchValue] = useState("");

    if (!isFocused) {
        return (
            <SearchBoxButton onClick={() => setIsFocused(true)}>
                <SearchOutlined />
                <p>{searchValue || "Search here..."}</p>
            </SearchBoxButton>
        );
    }

    return (
        <SearchBoxInput
            className="search-box"
            onBlur={() => setIsFocused(false)}
            focused={!!searchValue}
        >
            <SearchOutlined />
            <input
                autoFocus
                ref={ref}
                type="text"
                placeholder="Search here..."
                onChange={(e) => setSearchValue(e.target.value)}
                key="search-box"
                value={searchValue}
            />
            {searchValue && <SearchResults query={searchValue} />}
        </SearchBoxInput>
    );
});

export default SearchBox;
