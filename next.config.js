//npx storybook@next automigrate
const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: [
            "preview.redd.it",
            "b.thumbs.redditmedia.com",
            "styles.redditmedia.com",
            "a.thumbs.redditmedia.com",
            "external-preview.redd.it",
        ],
    },
    sassOptions: {
        includePaths: [path.join(__dirname, "styles")],
    },
};

module.exports = nextConfig;
