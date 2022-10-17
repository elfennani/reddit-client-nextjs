import { SearchOutlined } from "@ant-design/icons";
import React from "react";
import styled from "styled-components";

const SearchboxStyle = styled.div`
    height: 40px;
    background-color: ${(props) => props.theme.background};
    width: 500px;
    max-width: 100%;
    border-radius: 12px;
    display: flex;

    > span {
        font-size: 18px;
        display: flex;
        width: 40px;
        align-items: center;
        justify-content: center;
        opacity: 0.33;
    }

    > input {
        flex: 1;
        background: transparent;
        border: none;
        outline: none;
        font-family: ${(props) => props.theme.fontFamily};
        color: ${(props) => props.theme.text};
        padding-right: 16px;
    }
`;

const SearchBox = () => {
    return (
        <SearchboxStyle className="search-box">
            <SearchOutlined />
            <input type="text" placeholder="Search here..." />
        </SearchboxStyle>
    );
};

export default SearchBox;
