import React, { useContext } from "react";
import styles from "./CreatePost.module.scss";
import {
    EditOutlined,
    FileImageOutlined,
    VideoCameraOutlined,
} from "@ant-design/icons";
import Card from "../Card.tsx";
import TokenContext from "../../contexts/TokenContext";
import { getUserProfile } from "../../repository/reddit_api";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { CardStyle } from "../Card";

const CreatePostStyle = styled(Card)`
    display: grid;
    grid-template-columns: 32px 1fr;
    gap: 16px;
    padding: 16px;

    &:hover {
        background-color: ${(props) => props.theme.cardBgHover} !important;
    }

    .buttonsContainer {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;

        button {
            font-size: 0.7rem;
            font-family: ${(props) => props.theme.fontFamily};
            background-color: ${(props) => props.theme.background};
            border: none;
            padding: 6px 14px;
            border-radius: 100px;
            color: ${(props) => props.theme.text};
            cursor: pointer;
            transition: background-color 0.2s;
            user-select: none;

            &:hover {
                background-color: darken($color: #f6f6f6, $amount: 5%);
            }

            span {
                color: ${(props) => props.theme.primary};
                margin-right: 8px;
                font-size: 0.8rem;
            }
        }
    }
`;

const CreatePost = (props) => {
    const token = useContext(TokenContext);

    const { isLoading, isError, data, isSuccess } = useQuery(
        ["user", token],
        async () => await getUserProfile(token)
    );

    return (
        <CreatePostStyle className={styles.form}>
            {isSuccess ? <img src={data.pfp} alt={props.username} /> : <img />}
            <div>
                <div className={styles.textEditor}>
                    <p>Start writing your post</p>
                    <EditOutlined />
                </div>
                <div className="buttonsContainer">
                    <button
                        className={styles.smallButton}
                        onClick={props.onUploadImage}
                    >
                        <FileImageOutlined />
                        Upload images
                    </button>
                    <button
                        className={styles.smallButton}
                        onClick={props.onUploadVideo}
                    >
                        <VideoCameraOutlined />
                        Upload video
                    </button>
                </div>
            </div>
        </CreatePostStyle>
    );
};

CreatePost.propTypes = {};

export default CreatePost;
