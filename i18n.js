module.exports = {
    locales: ["en", "sv"],
    defaultLocale: "sv",
    pages: {
        "*": ["common"],
        "rgx:^/feed/?.*": ["feed"],
        "/chapter/document": ["document", "filter"],
        "/event/[slug]": ["event", "ticket"],
        "/ticket/[id]": ["ticket"],
    },
};
