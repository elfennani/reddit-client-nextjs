export default {
    clientId: process.env.CLIENT_ID || "DWY9af0IjWnRpN6wT0t0dg",
    secretId: process.env.CLIENT_SECRET || "HOdNt-cApn886xJs4OxhlRL114xveg",
    redirectUri: "http://localhost:3000/authenticate",
    basicCredentials: Buffer.from(
        "DWY9af0IjWnRpN6wT0t0dg:HOdNt-cApn886xJs4OxhlRL114xveg"
    ).toString("base64"),
};
