module.exports = {
    locales: ["en", "sv"],
    defaultLocale: "sv",
    pages: {
        "*": ["common", "seo"],
        "/event/[slug]/checkout": ["checkout"],
        "/chapter/document": ["document", "filter", "datepicker", "searchbar"],
        "/chapter/committee": ["mdx"],
        "/chapter/brand": ["brand"],
        "/contact": ["contact"],
        "/contact/[slug]": ["contact"],
        "/event/[slug]": ["event", "ticket"],
        "/job/[slug]": ["job"],
        "/committee/[slug]": ["mdx"],
        "/blog": ["searchbar", "feed"],
        "/": ["landingpage", "feed"],
    },
};
