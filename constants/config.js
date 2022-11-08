import Router from "next/router";

const host =
    process.env.HOST || window.location.origin || "http://localhost:3000/";

export default {
    clientId: process.env.CLIENT_ID || "DWY9af0IjWnRpN6wT0t0dg",
    secretId: process.env.CLIENT_SECRET || "HOdNt-cApn886xJs4OxhlRL114xveg",
    redirectUri: `${host}${
        host[host.length - 1] === "/" ? "" : "/"
    }authenticate`,
};
