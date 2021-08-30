import strapi, { gql } from "lib/strapi";
import { useEffect, useMemo } from "react";
import { atom, atomFamily, selectorFamily, useRecoilState } from "recoil";
import { DefFooter, DefHeader } from "types/global";
import defaultHeaderState from "../../prefetch/static/header.json";
import defaultFooterState from "../../prefetch/static/footer.json";
import _ from "underscore";

const getHeaderFromFile = () => {
    return defaultHeaderState as DefHeader;
};

const getFooterFromFile = () => {
    return defaultFooterState as DefFooter;
};

type ValueOf<T> = T[keyof T];

export const headerState = atom<DefHeader>({
    key: "ATOM/HEADER",
    default: getHeaderFromFile(),
});

export const footerState = atom<DefFooter>({
    key: "ATOM/FOOTER",
    default: getFooterFromFile(),
});

export interface Layout {
    header: DefHeader;
    footer: DefFooter;
}

export const layoutState = atom<Layout>({
    key: "ATOMFAMILY/LAYOUT",
    default: {
        header: getHeaderFromFile(),
        footer: getFooterFromFile(),
    },
});

export const useHydrater = (data: {
    header?: DefHeader;
    footer?: DefFooter;
}) => {
    const [_layout, setLayout] = useRecoilState(layoutState);

    useEffect(() => {
        if (data !== _layout) {
            const newData = _.chain(data)
                .pairs()
                .filter(_.isObject)
                .reduce((prev, [k, v]) => ({ ...prev, [k]: v }), {})
                .value();

            setLayout({ ..._layout, ...newData });
        }
    }, []);
};

export const layout = selectorFamily({
    key: "SELECTORFAMILY/LAYOUT",
    get:
        <T extends keyof Layout>(section: T) =>
        ({ get }) => {
            const state = get(layoutState);
            return state[section];
        },
});
type SectionFetch = "all" | keyof Layout;
export const fetchHydration = async (section: SectionFetch = "all") => {
    if (section === "all") {
        return { header: await getHeader(), footer: await getFooter() };
    }
    if (section === "header") {
        return await getHeader();
    }
    return await getFooter();
};

export const getFooter = async () => {
    const { data } = await strapi.query<{ footer: DefFooter }>({
        query: gql`
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
        `,
    });

    return data.footer;
};

export const getHeader = async () => {
    const { data } = await strapi.query<{ header: DefHeader }>({
        query: gql`
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
        `,
    });
    return data.header;
};
