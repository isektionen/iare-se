const nextTranslate = require("next-translate");
const withPlugins = require("next-compose-plugins");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
});
const getEnv = require("./env");

module.exports = withPlugins([getEnv, [withBundleAnalyzer], nextTranslate], {
    async redirects() {
        return [
            {
                source: "/chapter/board",
                destination: "/committee/styrelsen",
                permanent: true,
            },
        ];
    },
    images: {
        domains: ["iare-strapi-backend.s3.eu-north-1.amazonaws.com"],
    },
    reactStrictMode: true,
    target: "serverless",
    webpack5: false,
    i18n: {
        locales: ["en", "sv"],
        defaultLocale: "sv",
    },
});
