module.exports = {
    locales: ["en", "sv-SE"],
    defaultLocale: "sv-SE",
    loader: false,
    pages: {
        "*": ["common"],
    },
    loadLocaleFrom: (locale, namespace) =>
        import(`./locales/${locale}/${namespace}`).then((m) => m.default),
};
