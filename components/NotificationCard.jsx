import React from "react";
import PropTypes from "prop-types";
import styles from "./Notification.module.scss";
import Card from "./Card";
import {
    ExclamationCircleOutlined,
    NotificationFilled,
    ReloadOutlined,
} from "@ant-design/icons";
import Button from "./Button";

const NotificationCard = (props) => {
    let content;
    content =
        !props.children || props.children.length == 0 ? (
            <p className={styles.empty}>{props.emptyText}</p>
        ) : (
            props.children
        );
    if (props.errorMessage) {
        content = (
            <p className={styles.error}>
                <ExclamationCircleOutlined /> {props.errorMessage}
            </p>
        );
    }
    return (
        <Card className={styles.container}>
            <div className={styles.title}>
                <h2>
                    <NotificationFilled size={18} style={{ fontSize: 18 }} />{" "}
                    Notifications
                </h2>
                {props.onRefresh ? (
                    <button
                        className={styles.refreshButton}
                        onClick={props.onRefresh}
                    >
                        <ReloadOutlined style={{ fontSize: 12 }} />
                    </button>
                ) : null}
            </div>
            <div
                className={[
                    styles.notificationContainer,
                    props.children ? styles.loaded : null,
                ].join(" ")}
            >
                {content}
            </div>
            {props.onShowAll && !props.errorMessage ? (
                <Button
                    className={styles.button}
                    title="SHOW ALL"
                    secondary
                    onClick={props.onShowAll}
                />
            ) : null}
        </Card>
    );
};

NotificationCard.defaultProps = {
    emptyText: "Nothings to see here",
};

NotificationCard.propTypes = {
    onRefresh: PropTypes.func,
    onShowAll: PropTypes.func,
    emptyText: PropTypes.string,
    errorMessage: PropTypes.string,
};

export default NotificationCard;
