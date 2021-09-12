import { useEffect } from "react";
import {
    atom,
    selector,
    selectorFamily,
    useRecoilValue,
    useSetRecoilState,
} from "recoil";

interface LocaleState {
    slug: string;
    locale: string;
}

const localeState = atom<LocaleState[]>({
    key: "ATOM/LOCALESTATE",
    default: [],
});

const stateSelector = selector({
    key: "SELECTOR/LOCALSTATE",
    get: ({ get }) => {
        const state = get(localeState);
        return (locale: string) => state.find((item) => item.locale === locale);
    },
});

export const useLocaleSlug = () => {
    const selector = useRecoilValue(stateSelector);
    return (cb: (locale: LocaleState | null) => void, locale: string) => {
        const _locale = selector(locale);
        if (_locale) {
            return cb(_locale);
        }
        cb(null);
    };
};

export const useSetLocaleSlug = (locales: LocaleState[] | undefined) => {
    const setState = useSetRecoilState(localeState);
    useEffect(() => {
        if (locales) {
            setState(locales);

            return () => {
                setState([]);
            };
        }
    }, [locales, setState]);
};
