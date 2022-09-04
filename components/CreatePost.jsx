import React from "react";
import PropTypes from "prop-types";
import styles from "./CreatePost.module.scss";
import {
    EditOutlined,
    FileImageOutlined,
    VideoCameraOutlined,
} from "@ant-design/icons";
import Card from "./Card";

const CreatePost = (props) => {
    return (
        <Card className={styles.form}>
            <img src={props.image} alt={props.username} />
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
