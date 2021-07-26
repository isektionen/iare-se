const nextTranslate = require("next-translate");
const withPlugins = require("next-compose-plugins");
module.exports = withPlugins([nextTranslate], {
    images: {
        domains: ["iare-strapi-backend.s3.eu-north-1.amazonaws.com"],
    },
    reactStrictMode: true,
    target: "serverless",
    webpack: (config) => {
        return {
            ...config,
            externals: [
                ...config.externals,
                { canvas: "canvas", critters: "critters" },
            ],
        };
    },
    i18n: {
        locales: ["en", "sv"], // perhaps change it to regular sv in production
        defaultLocale: "sv",
        domains: [
            {
                domain: "localhost",
                defaultLocale: "sv",
                // bypassing sub-paths by redirecting all locales to a single domain, and then taking care of the routing dynamically
                locales: ["en"],
            },
        ],
    },
});
