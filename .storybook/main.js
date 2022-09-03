const path = require("path");
module.exports = {
    stories: [
        "../stories/**/*.stories.mdx",
        "../stories/**/*.stories.@(js|jsx|ts|tsx)",
    ],
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-interactions",
        {
            name: "@storybook/preset-scss",
            options: {
                cssLoaderOptions: {
                    modules: true,
                },
                sassLoaderOptions: {
                    additionalData: (content) => {
                        // paths are relative to root dir in this case
                        return (
                            `
                    @import "../styles/globals.scss";
                  ` + content
                        ); // content is the individual module.scss file
                    },
                },
            },
        },
    ],
    framework: "@storybook/react",
    core: {
        builder: "@storybook/builder-webpack5",
    },
    reactDocgen: true,
    presets: [path.resolve(__dirname, "./next-preset.js")],
};
