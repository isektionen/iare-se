module.exports = {
    locales: ["en", "sv"],
    defaultLocale: "sv",
    loader: false,
    pages: {
        "*": ["common"],
    },
    loadLocaleFrom: (locale, namespace) =>
        import(`./locales/${locale}/${namespace}`).then((m) => m.default),
};
