import Router from "next/router";

export default {
    clientId: "DWY9af0IjWnRpN6wT0t0dg",
    secretId: "HOdNt-cApn886xJs4OxhlRL114xveg",
    redirectUri: `${process.env.HOST || window.location.origin}/authenticate`,
    basicCredentials: Buffer.from(
        "DWY9af0IjWnRpN6wT0t0dg:HOdNt-cApn886xJs4OxhlRL114xveg"
    ).toString("base64"),
};
