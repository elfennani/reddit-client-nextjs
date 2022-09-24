import React, { useContext } from "react";
import PropTypes from "prop-types";
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

const CreatePost = (props) => {
    const token = useContext(TokenContext);

    const { isLoading, isError, data, isSuccess } = useQuery(
        ["user", token],
        async () => await getUserProfile(token)
    );

    return (
        <Card className={styles.form}>
            {isSuccess ? <img src={data.pfp} alt={props.username} /> : <img />}
            <div>
                <div className={styles.textEditor}>
                    <p>Start writing your post</p>
                    <EditOutlined />
                </div>
                <div className={styles.buttonsContainer}>
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
        </Card>
    );
};

CreatePost.propTypes = {};

export default CreatePost;
