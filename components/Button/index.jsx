import React from "react";
import PropTypes from "prop-types";
import styles from "./Button.module.scss";
import Head from "next/head";

const Button = (props) => {
    /**
     * @type {React.CSSProperties}
     */
    let colorStyle;
    styles;
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
                style={{
                    hover: {
                        height: 300,
                    },
                }}
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
};

export default Button;
