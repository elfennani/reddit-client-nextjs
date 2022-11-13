//npx storybook@next automigrate
const path = require("path");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = withBundleAnalyzer({
    i18n: {
        locales: ["en"],
        defaultLocale: "en",
    },
    reactStrictMode: true,
    experimental: {
        scrollRestoration: true,
    },
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
    compiler: {
        styledComponents: true,
    },
});

module.exports = nextConfig;
