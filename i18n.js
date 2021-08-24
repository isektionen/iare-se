module.exports = {
    locales: ["en", "sv"],
    defaultLocale: "sv",
    pages: {
        "*": ["common"],
        "rgx:^/feed/?.*": ["feed"],
        "/chapter/document": ["document", "filter", "datepicker", "searchbar"],
        "/event/[slug]": ["event", "ticket"],
        "/ticket/[id]": ["ticket"],
    },
};
