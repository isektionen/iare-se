import { atom, selector } from "recoil";
import { FooterProps } from "types/footer";
import { MenuListItem } from "types/global";
import { HeaderProps, LanguageItem } from "types/header";

const defaultMenu = [
    {
        title: "Aktuellt",
        dropDownMenu: false,
        listItems: [
            {
                href: "/",
                name: "Händelser",
            },
            {
                href: "/",
                name: "Jobb",
            },
            {
                href: "/",
                name: "Event",
            },
        ],
    },
    {
        title: "Sektionen",
        dropDownMenu: true,
        listItems: [
            {
                href: "/",
                name: "Styrelsen",
            },
            {
                href: "/",
                name: "Nämnder",
            },
            {
                href: "/",
                name: "Projekt",
            },
            {
                href: "/",
                name: "Dokument",
            },
            {
                href: "/",
                name: "Grafisk Profil",
            },
            {
                href: "/",
                name: "Bokning",
            },
        ],
    },
    {
        title: "Sökande",
        dropDownMenu: true,
        listItems: [
            {
                href: "/",
                name: "Vad är Industriell Ekonomi?",
            },
            {
                href: "/",
                name: "Utbildningen",
            },
            {
                href: "/",
                name: "Intervjuer från olika årgångar",
            },
            {
                href: "/",
                name: "Intervjuer från alumner",
            },
            {
                href: "/",
                name: "Studentliv",
            },
        ],
    },
    {
        title: "Företag",
        dropDownMenu: true,
        listItems: [
            {
                href: "/",
                name: "Samarbeten",
            },
            {
                href: "/",
                name: "Annonsering",
            },
        ],
    },
];

const defaultLanguages = [
    {
        name: "Svenska",
        code: "se",
    },
    {
        name: "English",
        code: "en",
    },
];

export const menuAtom = atom<MenuListItem[]>({
    key: "ATOM/MENU",
    default: defaultMenu,
});

export const languageAtom = atom<LanguageItem[]>({
    key: "ATOM/LANGUAGE",
    default: defaultLanguages,
});

export const headerState = selector<HeaderProps>({
    key: "SELECTOR/HEADER",
    get: async ({ get }) => {
        const menuList = get(menuAtom);
        const languages = get(languageAtom);
        return { menuList, languages, contact: "Kontakt" };
    },
});

export const footerState = selector<FooterProps>({
    key: "SELECTOR/FOOTER",
    get: async ({ get }) => {
        const menuList = get(menuAtom);
        return { menuList, responsiblePublisher: "Alice?" };
    },
});
