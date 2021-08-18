const { request } = require("graphql-request");

const resolver = async () => {
    const data = await request(
        "https://cms.iare.se/graphql",
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
