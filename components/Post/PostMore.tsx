import { CloseOutlined, MoreOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import TokenContext from "../../contexts/TokenContext";
import { savePost, unsavePost } from "../../repository/reddit_api";
import { PostData } from "../../types/types";
import PostButton from "./PostButton";

type Props = {
    data: PostData;
};

/*
router.push(props.data.permalink, undefined, {
    locale: false,
})
*/

const ButtonWrapper = styled.div`
    position: relative;
`;

const MoreOptions = styled.ul`
    position: absolute;
    margin: 0;
    padding: 0;
    width: max-content;
    right: 0;
    bottom: 0;
    transform: translateY(100%);
    list-style: none;
    background: ${(p) => p.theme.background};
    border-radius: 7px;
    border: 1px solid ${(p) => p.theme.border};
    box-shadow: ${(p) => p.theme.cardShadow};
    overflow: hidden;
    z-index: 4;

    > li {
        text-align: center;

        > * {
            padding: 12px 16px;
            display: block;
            width: 100%;
            height: 100%;
            border: none;
            outline: none;
            background: none;
            color: inherit;
            font-family: ${(p) => p.theme.fontFamily};
            font-size: 0.9rem;
            transition: all 0.2s;
            cursor: pointer;
            user-select: none;

            &:hover {
                background-color: ${(p) => p.theme.backgroundDark};
            }
        }

        &:not(:last-child) {
            border-bottom: 1px solid ${(p) => p.theme.border};
        }
    }
`;

const PostMore = (props: Props) => {
    const token = useContext(TokenContext);
    const [isMenuRevealed, setIsMenuRevealed] = useState(false);
    const [isSaved, setIsSaved] = useState(props.data.saved);

    const save = () => {
        !isSaved
            ? savePost(token, "Whatever", props.data.name, () => {
                  setIsSaved(true);
              })
            : unsavePost(token, props.data.name, () => setIsSaved(false));
    };

    return (
        <ButtonWrapper>
            <PostButton
                title="More Options"
                onClick={() => setIsMenuRevealed((state) => !state)}
                icon={isMenuRevealed ? <CloseOutlined /> : <MoreOutlined />}
            />
            {isMenuRevealed && (
                <MoreOptions>
                    <li>
                        <a
                            href={props.data.permalink}
                            target="_blank"
                            onClick={(e) => e.preventDefault()}
                        >
                            Open in Reddit
                        </a>
                    </li>
                    <li>
                        <button
                            type="button"
                            onClick={(e) => {
                                e.preventDefault();
                                save();
                            }}
                        >
                            {isSaved ? "Saved" : "Save"}
                        </button>
                    </li>
                    <li>
                        <button
                            type="button"
                            onClick={(e) => {
                                e.preventDefault();
                                save();
                            }}
                        >
                            Copy Link
                        </button>
                    </li>
                </MoreOptions>
            )}
        </ButtonWrapper>
    );
};

export default PostMore;
