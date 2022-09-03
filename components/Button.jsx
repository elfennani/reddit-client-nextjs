import React from "react";
import PropTypes from "prop-types";
import styles from "./Button.module.scss";

const Button = (props) => {
    return (
        <button
            className={styles.button}
            onClick={props.onClick}
            disabled={props.disabled || props.onClick == null}
        >
            {props.title}
        </button>
    );
};

Button.propTypes = {
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    title: PropTypes.string.isRequired,
};

export default Button;
