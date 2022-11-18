import {
    ArrowRightOutlined,
    FrownOutlined,
    LoadingOutlined,
    RightOutlined,
    SmileOutlined,
} from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { decode } from "html-entities";
import Link from "next/link";
import React, { useContext, useEffect } from "react";
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
    padding: 8px;
    border-radius: 0 0 12px 12px;
    box-sizing: border-box;
    border: 1px solid ${(p) => p.theme.text25};
    border-top: 0;

    p.error {
        color: red;
    }

    .empty,
    .error {
        text-align: center;
        padding: 12px;

        &.error * {
            color: red !important;

            a {
                text-decoration: underline;
            }
        }

        p,
        h1 {
            text-align: center;
            margin: 0;
            padding: 0;
            opacity: 0.66;
        }

        h1 {
            margin-bottom: 8px;
        }
    }
`;

const SearchList = styled.div`
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const SearchListItem = styled.a`
    list-style: none;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px;
    border-radius: 9px;
    transition: background 0.15s ease-in-out;

    &:hover {
        background: ${(p) =>
            p.theme.name == "dark" ? p.theme.backgroundDark : "white"};
    }

    > div:not(.image-placeholder) {
        flex: 1;
    }

    > span {
        opacity: 0.66;
    }

    .image-placeholder,
    img {
        width: 32px;
        height: 32px;
        border-radius: 7px;
        background: ${(p) => "white"};
    }

    h3 {
        margin: 0;
        font-size: 1rem;
        font-weight: 400;
        font-weight: 600;
    }

    p {
        margin: 0;
        font-weight: 400;
        font-size: 1rem;
        font-size: 0.75rem;
        opacity: 0.5;
    }
`;

const SearchResults = (props: Props) => {
    const query = useDebounce(props.query);
    const token = useContext(TokenContext);

    const { data, isLoading, isError, error, refetch } = useQuery(
        [token, "search", query],
        () => getSearchResult(token, query),
        {
            keepPreviousData: true,
        }
    );

    if (isError || error) {
        return (
            <SearchResultsStyle>
                <div className="error">
                    <h1>
                        <FrownOutlined />
                    </h1>
                    <p>
                        Something went wrong,{" "}
                        <a
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                refetch();
                            }}
                        >
                            Try Again
                        </a>
                    </p>
                </div>
            </SearchResultsStyle>
        );
    }

    if (isLoading) {
        return (
            <SearchResultsStyle>
                <div className="empty">
                    <h1>
                        <LoadingOutlined />
                    </h1>
                    <p>Getting that sweet search data</p>
                </div>
            </SearchResultsStyle>
        );
    }

    return (
        <SearchResultsStyle>
            <SearchList>
                {data.length ? (
                    data.map((item) => (
                        <Link href={"/" + item.name} passHref key={item.name}>
                            <SearchListItem>
                                {item.icon ? (
                                    <img
                                        src={decode(item.icon)}
                                        alt={item.name}
                                    />
                                ) : (
                                    <div className="image-placeholder"></div>
                                )}
                                <div>
                                    <h3>{item.name}</h3>
                                    <p>
                                        {minimizeNumber(item.followers, 1)}{" "}
                                        followers
                                    </p>
                                </div>
                                <RightOutlined />
                            </SearchListItem>
                        </Link>
                    ))
                ) : (
                    <div className="empty">
                        <h1>
                            <SmileOutlined />
                        </h1>
                        <p>Nothing to see here</p>
                    </div>
                )}
            </SearchList>
        </SearchResultsStyle>
    );
};

export default SearchResults;
