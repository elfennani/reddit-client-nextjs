import { GetServerSideProps } from "next";
import React from "react";
import { setTimeout } from "timers";

type Props = {
    number: number;
};

const test = (props: Props) => {
    return (
        <a>
            <div>{props.number}</div>
        </a>
    );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    let number;
    try {
        number = await new Promise((resolve, reject) => {
            setTimeout(function () {
                let number = Math.random();
                if (number < 0.5) {
                    reject();
                    return;
                }
                resolve(number);
            }, 1000);
        });
    } catch (error) {}

    console.log(number);

    return {
        props: {
            number: number,
        },
    };
};

export default test;
