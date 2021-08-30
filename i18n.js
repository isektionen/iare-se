module.exports = {
    locales: ["en", "sv"],
    defaultLocale: "sv",
    pages: {
        "*": ["common"],
        "rgx:^/feed/?.*": ["feed"],
        "/chapter/document": ["document", "filter", "datepicker", "searchbar"],
        "/contact": ["contact"],
        "/contact/[slug]": ["contact"],
        "/event/[slug]": ["event", "ticket"],
        "/ticket/[id]": ["ticket"],
    },
};
