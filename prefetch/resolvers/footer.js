const { request } = require("graphql-request");

const resolver = async () => {
    const data = await request(
        process.env.NODE_ENV === "production"
            ? "https://cms.iare.se/graphql"
            : "http://localhost:1337/graphql",
        `
    query {
        footer {
            locale
            social {
                id
                type
                href
            }
            representative {
                user {
                    firstname
                    lastname
                }
            }
            logo {
                alternativeText
                width
                height
                url
            }
            localizations {
                locale
                social {
                    id
                    type
                    href
                }
                representative {
                    user {
                        firstname
                        lastname
                    }
                }
                logo {
                    alternativeText
                    width
                    height
                    url
                }
            }
        }
    }
`
    );
    return {
        basename: "footer",
        data: data.footer,
    };
};

module.exports = resolver;
