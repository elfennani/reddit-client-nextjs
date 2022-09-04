import React from "react";
import styles from "./Notification.module.scss";
import PropTypes from "prop-types";
import Link from "next/link";

const NotificationItem = (props) => {
    const content = (
        <div className={styles.item}>
            <img src={props.image} alt={props.title} className={styles.pfp} />
            <div>
                <p>{props.title}</p>
                <p>{props.text}</p>
            </div>
        </div>
    );

    if (props.link) {
        return (
            <Link href={props.link}>
                <a className={styles.link}>{content}</a>
            </Link>
        );
    }
    return content;
};

NotificationItem.propTypes = {
    image: PropTypes.string,
    title: PropTypes.string,
    text: PropTypes.string,
    link: PropTypes.string,
};

export default NotificationItem;
