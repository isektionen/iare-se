module.exports = {
    locales: ["en", "sv-SE"],
    defaultLocale: "sv-SE",
    pages: {
        "*": ["common"],
        "rgx:^/feed/?.*": ["feed"],
        "/chapter/document": ["document"],
        "/event/[slug]": ["event"],
    },
};
