import React from "react";
import PropTypes from "prop-types";
import Card from "./Card";
import Button from "./Button";

const LoginCard = (props) => {
    return (
        <Card
            style={{
                width: 500,
                margin: "0 auto",
                marginTop: 100,
                padding: 16,
                maxWidth: "calc(100% - 16px)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "stretch",
                textAlign: "center",
            }}
        >
            <h1 style={{ margin: 0, marginBottom: 16 }}>Welcome!</h1>
            <Button title="Login with reddit" link={props.link} />
        </Card>
    );
};

LoginCard.propTypes = {
    link: PropTypes.string,
};

export default LoginCard;
