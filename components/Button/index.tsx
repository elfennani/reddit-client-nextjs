import React from "react";
import PropTypes from "prop-types";
import styles from "./Button.module.scss";
import Link from "next/link";
import { useTheme } from "styled-components";

interface ButtonProps {
    onClick?(): void;
    disabled?: boolean;
    title: any;
    secondary?: boolean;
    className?: string;
    link?: string;
    style?: any;
}

const Button: React.FC<ButtonProps> = (props) => {
    const theme = useTheme();
    if (props.link) {
        return (
            <Link href={props.disabled ? "#" : props.link} passHref>
                <a
                    className={[
                        styles.button,
                        props.secondary ? styles.secondary : null,
                        props.className ? props.className : null,
                    ].join(" ")}
                    style={props.style}
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
                style={{ ...props.style, color: theme.primary }}
            >
                {props.title}
            </button>
        </>
    );
};

export default Button;
