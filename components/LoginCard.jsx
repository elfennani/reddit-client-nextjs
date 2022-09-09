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
            }}
        >
            <Button title="Login with reddit" onClick={props.onLogin} />
        </Card>
    );
};

LoginCard.defaultProps = {
    onLogin: () => console.log("Login"),
};

LoginCard.propTypes = {
    onLogin: PropTypes.func,
};

export default LoginCard;
