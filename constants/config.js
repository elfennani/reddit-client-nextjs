import Router from "next/router";

const host = process.env.HOST || window.location.origin;

export default {
    clientId: "DWY9af0IjWnRpN6wT0t0dg",
    secretId: "HOdNt-cApn886xJs4OxhlRL114xveg",
    redirectUri: `${host}${
        host[host.length - 1] === "/" ? "" : "/"
    }authenticate`,
    basicCredentials: Buffer.from(
        "DWY9af0IjWnRpN6wT0t0dg:HOdNt-cApn886xJs4OxhlRL114xveg"
    ).toString("base64"),
};
