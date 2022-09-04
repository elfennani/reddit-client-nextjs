import React from "react";
import PropTypes from "prop-types";
import Card from "../Card";
import styles from "./AccountTemplate.module.scss";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Button from "../Button";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { minimizeNumber } from "../../utils/functions";
import Link from "next/link";

const AccountTemplate = ({
    fullname = "N/A",
    username = "N/A",
    age = "N/A",
    karma = "N/A",
    cover,
    profilePicture,
    isLoading = true,
    errorMessage,
    onRefresh,
}) => {
    if (errorMessage) {
        return (
            <Card className={[styles.card, styles.error].join(" ")}>
                <p>
                    <ExclamationCircleOutlined style={{ marginRight: 8 }} />
                    {errorMessage}
                </p>
                <Button onClick={onRefresh} title="Try Again" />
            </Card>
        );
    }

    return (
        <Card className={styles.card}>
            <div
                style={
                    isLoading || !cover
                        ? {
                              background: "lightgrey",
                          }
                        : { backgroundImage: `url(${cover})` }
                }
                className={styles.cover}
            >
                <div className={styles.profileContainer}>
                    {isLoading || !profilePicture ? (
                        <Skeleton width={56} height={56} />
                    ) : (
                        <img
                            src={profilePicture}
                            className={styles.profile}
                            alt={fullname}
                            width={56}
                            height={56}
                        />
                    )}
                </div>
            </div>
            {isLoading ? (
                <div className={styles.centerFlex}>
                    <Skeleton width={150} />
                    <Skeleton width={100} />
                </div>
            ) : (
                <>
                    <h1>{fullname}</h1>
                    <p>{username}</p>
                </>
            )}
            <div className={styles.split}>
                <div>
                    <h5>Created</h5>
                    {isLoading ? <Skeleton /> : <p>{age}</p>}
                </div>
                <div>
                    <h5>Karma</h5>
                    {isLoading ? (
                        <Skeleton />
                    ) : (
                        <p>{minimizeNumber(karma, 0)}</p>
                    )}
                </div>
            </div>
        </Card>
    );
};

AccountTemplate.propTypes = {
    fullname: PropTypes.string,
    username: PropTypes.string,
    age: PropTypes.string,
    karma: PropTypes.number,
    cover: PropTypes.string,
    profilePicture: PropTypes.string,
    isLoading: PropTypes.bool,
    errorMessage: PropTypes.string,
    onRefresh: PropTypes.func,
};

export default AccountTemplate;
