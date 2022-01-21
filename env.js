module.exports = (nextConfig = {}) => {
    return Object.assign({}, nextConfig, {
        webpack: (config, { dev, webpack }) => {
            const test_nets_local = true;

            const force_local_backend = false;
            const isDev = dev;

            console.log(`isDev: ${isDev}`);
            const env = {
                NEXT_PUBLIC_CHECKOUT_SRC:
                    test_nets_local || isDev
                        ? process.env.TEST_CHECKOUT
                        : process.env.LIVE_CHECKOUT,
                NEXT_PUBLIC_CHECKOUT_KEY:
                    test_nets_local || isDev
                        ? process.env.TEST_CHECKOUT_KEY
                        : process.env.LIVE_CHECKOUT_KEY,
                NEXT_PUBLIC_STRAPI:
                    isDev && force_local_backend
                        ? "http://localhost:1337"
                        : "https://cms.iare.se",
                NETS_BEARER:
                    test_nets_local || isDev
                        ? process.env.TEST_NETS_BEARER
                        : process.env.LIVE_NETS_BEARER,
                NETS_BASE_API:
                    test_nets_local || isDev
                        ? "https://test.api.dibspayment.eu/v1"
                        : "https://api.dibspayment.eu/v1",
            };
            console.log(env);
            config.plugins.push(new webpack.EnvironmentPlugin(env));
            return {
                ...config,
                externals: [
                    ...config.externals,
                    { canvas: "canvas", critters: "critters" },
                ],
            };
        },
    });
};
