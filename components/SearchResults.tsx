import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import styled from "styled-components";
import TokenContext from "../contexts/TokenContext";
import useDebounce from "../hooks/useDebounce";
import { getSearchResult } from "../repository/reddit_api";
import { minimizeNumber } from "../utils/functions";

type Props = {
    query: string;
};

const SearchResultsStyle = styled.div`
    position: absolute;
    left: -1px;
    right: -1px;
    bottom: 0;
    transform: translateY(100%);
    background: ${(p) => p.theme.background};
    padding: 16px;
    border: 1px solid ${(p) => p.theme.text25};
    border-top: none;
    border-radius: 0 0 12px 12px;

    p.error {
        color: red;
    }
`;

const SearchResults = (props: Props) => {
    const query = useDebounce(props.query);
    const token = useContext(TokenContext);
    const { data, isLoading, isError, error } = useQuery(
        [token, "search", query],
        () => getSearchResult(token, query),
        {
            keepPreviousData: true,
        }
    );

    if (isError || error) {
        return (
            <SearchResultsStyle>
                <p className="error">Something wrong happened</p>
            </SearchResultsStyle>
        );
    }

    if (isLoading) {
        return <SearchResultsStyle>Loading...</SearchResultsStyle>;
    }

    return (
        <SearchResultsStyle>
            <>
                Search Results for:
                <ul>
                    {data.map((item) => (
                        <li>
                            {item.isUser ? "u/" : "r/"}
                            {item.name}: {minimizeNumber(item.followers, 1)}{" "}
                            followers
                        </li>
                    ))}
                </ul>
            </>
        </SearchResultsStyle>
    );
};

export default SearchResults;
