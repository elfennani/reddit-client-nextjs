import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Card from "../Card";
import pagesList from "../../constants/pagesList";
import styled from "styled-components";

const PagesListStyle = styled.div`
    padding: 24px;

    ul {
        margin: 0;
        padding: 0;
        list-style: none;

        li {
            a {
                display: block;
                padding: 16px;
                text-transform: capitalize;
                position: relative;
                transition: all 0.2s;
                border-radius: 7px;
                color: ${(props) => props.theme.text};

                &:hover {
                    background-color: rgba(0, 0, 0, 0.03);
                }

                &.active {
                    background-color: ${(props) => props.theme.primaryLight};
                    color: ${(props) => props.theme.primary};
                }

                span {
                    margin-right: 16px;
                }
            }
            &:last-child {
                a::after {
                    display: none;
                }
            }
        }
    }
`;

interface PagesList {
    children?: React.ReactNode;
    onChange(): void;
    activePage?: string;
}

const PagesList: React.FC<PagesList> = ({
    children,
    onChange,
    activePage = "/",
}) => {
    const router = useRouter();

    return (
        <PagesListStyle>
            <ul>
                {pagesList.map((page, index) => {
                    let isActive;
                    if (router) {
                        isActive = page.activeCheck.includes(router.pathname);
                    } else {
                        isActive = page.activeCheck.includes(activePage);
                    }
                    return (
                        <li key={index}>
                            <Link href={page.link}>
                                <a
                                    className={isActive ? "active" : ""}
                                    onClick={onChange}
                                >
                                    {isActive
                                        ? page.activeIcon
                                        : page.inactiveIcon}
                                    {page.label}
                                </a>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </PagesListStyle>
    );
};

export default PagesList;
