module.exports = {
    locales: ["en", "sv"],
    defaultLocale: "sv",
    pages: {
        "*": ["common"],
        "/chapter/document": ["document", "filter", "datepicker", "searchbar"],
        "/chapter/committee": ["mdx"],
        "/chapter/brand": ["brand"],
        "/contact": ["contact"],
        "/contact/[slug]": ["contact"],
        "/event/[slug]": ["event", "ticket"],
        "/committee/[slug]": ["mdx"],
        "/blog": ["searchbar", "feed"],
        "/": ["landingpage", "feed"],
    },
};
