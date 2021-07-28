module.exports = {
    locales: ["en", "sv"],
    defaultLocale: "sv",
    loader: false,
    pages: {
        "*": ["common"],
        "rgx:^/feed/?.*": ["feed"],
    },
    loadLocaleFrom: (locale, namespace) =>
        import(`./locales/${locale}/${namespace}`).then((m) => m.default),
};
