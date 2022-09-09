import React from "react";
import PropTypes from "prop-types";
import styles from "./Button.module.scss";
import Head from "next/head";
import Link from "next/link";

const Button = (props) => {
    if (props.link) {
        return (
            <Link href={props.link} passHref>
                <a
                    className={[
                        styles.button,
                        props.secondary ? styles.secondary : null,
                        props.className ? props.className : null,
                    ].join(" ")}
                    disabled={props.disabled}
                >
                    {props.title}
                </a>
            </Link>
        );
    }

    return (
        <>
            <button
                className={[
                    styles.button,
                    props.secondary ? styles.secondary : null,
                    props.className ? props.className : null,
                ].join(" ")}
                onClick={props.onClick}
                disabled={props.disabled || props.onClick == null}
            >
                {props.title}
            </button>
        </>
    );
};

Button.defaultProps = {
    primaryColor: styles.primaryColor,
};

Button.propTypes = {
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    title: PropTypes.string.isRequired,
    secondary: PropTypes.bool,
    className: PropTypes.string,
    primaryColor: PropTypes.string,
    link: PropTypes.string,
};

export default Button;
