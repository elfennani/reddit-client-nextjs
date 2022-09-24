import React from "react";
import propTypes from "prop-types";

const Card: React.FC<
    React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
    >
> = (props) => {
    const cardStyle = {
        overflow: "hidden",
        border: "1px solid rgba(0,0,0,0.12)",
        borderRadius: 8,
        backgroundColor: "white",
        minHeight: 16,
    };

    return (
        <div {...props} style={{ ...cardStyle, ...props.style }}>
            {props.children}
        </div>
    );
};

// Card.propType = HTMLDivElement;

export default Card;
