import strapi, { gql } from "lib/strapi";
import { useEffect, useMemo } from "react";
import {
    atom,
    atomFamily,
    selectorFamily,
    useRecoilState,
    useRecoilValue,
    useSetRecoilState,
} from "recoil";
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

interface IPageMenu {
    label: string;
    viewports: ("header" | "drawer")[] | null;
    items: {
        leftIcon?: JSX.Element;
        label: string;
        href: string;
    }[];
}

const defaultMenuState = {
    label: "",
    viewports: null,
    items: [],
};

const pageMenuState = atom<IPageMenu>({
    key: "ATOM/PAGEMENU",
    default: defaultMenuState,
});

export const usePageMenu = (menu: IPageMenu) => {
    const setMenu = useSetRecoilState(pageMenuState);
    useEffect(() => {
        setMenu(menu);
        return () => {
            setMenu(defaultMenuState);
        };
    }, [menu, setMenu]);
};

interface DefaultAlert {
    status: "info" | "success" | "warning" | "error";
    title: string | undefined;
    description: string | undefined;
    isClosable: boolean;
    isOpen: boolean;
}

const defaultAlert: DefaultAlert = {
    status: "info",
    title: undefined,
    description: undefined,
    isClosable: false,
    isOpen: false,
};

const alertState = atom<DefaultAlert>({
    key: "ATOM/ALERT",
    default: defaultAlert,
});

export const useAlert = () => {
    const setState = useSetRecoilState(alertState);

    return (_alert: Partial<DefaultAlert> | "reset") => {
        if (_alert === "reset") {
            setState(defaultAlert);
        } else {
            setState((oldState) => ({ ...oldState, ..._alert }));
        }
    };
};

export const useAlertSelector = () => {
    const state = useRecoilValue(alertState);
    return state;
};

export const usePageHydrate = () => {
    const state = useRecoilValue(pageMenuState);
    return state;
};

export const layout = selectorFamily({
    key: "SELECTORFAMILY/LAYOUT",
    get:
        <T extends keyof Layout>({
            section,
            lang,
        }: {
            section: T;
            lang: string;
        }) =>
        ({ get }) => {
            const state = get(layoutState);

            const _section = state[section];
            if (_section && _section?.locale === lang) {
                return _section;
            }

            const localizations = _section?.localizations ?? [];

            /*@ts-ignore*/
            const localeSection = localizations.find((l) => l.locale === "en");

            if (localeSection) {
                return localeSection as Layout[T];
            }
            return _section as Layout[T];
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
            query FindHeader {
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
