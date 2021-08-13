const {
    PHASE_DEVELOPMENT_SERVER,
    PHASE_PRODUCTION_BUILD,
} = require("next/constants");

function isProduction() {
    return;
}

module.exports = {
    webpack: (config, { dev, webpack }) => {
        const isDev = dev;

        console.log(`isDev: ${isDev}`);
        const env = {
            NEXT_PUBLIC_CHECKOUT_SRC: isDev
                ? process.env.TEST_CHECKOUT
                : process.env.LIVE_CHECKOUT,
            NEXT_PUBLIC_CHECKOUT_KEY: isDev
                ? process.env.TEST_CHECKOUT_KEY
                : process.env.LIVE_CHECKOUT_KEY,
            NEXT_PUBLIC_STRAPI: "https://cms.iare.se",
            NEXT_PUBLIC_DETA: "https://366q30.deta.dev",
        };
        config.plugins.push(new webpack.EnvironmentPlugin(env));
        return config;
    },
};
