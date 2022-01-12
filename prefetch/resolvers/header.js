const { request } = require("graphql-request");

const resolver = async () => {
    const url =
        process.env.NODE_ENV === "production"
            ? "https://cms.iare.se/graphql"
            : "http://localhost:1337/graphql";
    const data = await request(
        url,
        `
    query {
        header {
            locale
            logo {
                alternativeText
                width
                height
                url
            }
            feedbackbox {
                description
              }
            sections {
                id
                label
                displayDropDown
                href
                subSection {
                    id
                    label
                    href
                    description
                    icon
                    color
                }
            }
            languages {
                label
                code
            }
            contact {
                label
                href
            }
            localizations {
                locale
                logo {
                    alternativeText
                    width
                    height
                    url
                }
                feedbackbox {
                    description
                  }
                sections {
                    id
                    label
                    displayDropDown
                    href
                    subSection {
                        id
                        label
                        href
                        description
                        icon
                        color
                    }
                }
                languages {
                    label
                    code
                }
                contact {
                    label
                    href
                }
            }
        }
    }
`
    );
    return {
        basename: "header",
        data: data.header,
    };
};

module.exports = resolver;
