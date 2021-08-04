const nextTranslate = require("next-translate");
const withPlugins = require("next-compose-plugins");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
});
module.exports = withPlugins([[withBundleAnalyzer], nextTranslate], {
    images: {
        domains: ["iare-strapi-backend.s3.eu-north-1.amazonaws.com"],
    },
    reactStrictMode: true,
    target: "serverless",
    webpack5: false,
    /*
    webpack: (config) => {
        return {
            ...config,
            externals: [
                ...config.externals,
                { canvas: "canvas", critters: "critters" },
            ],
        };
    },
    */
    i18n: {
        locales: ["en", "sv-SE"],
        defaultLocale: "sv-SE",
    },
});
