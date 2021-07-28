import { useRouter } from "next/router";
import React, { ReactNode, useEffect } from "react";
import setLanguage from "next-translate/setLanguage";
interface Props {
    children: ReactNode;
    locale: string;
}

export const LanguageWrapper = ({ children, locale }: Props) => {
    const router = useRouter();

    useEffect(() => {
        if (locale !== router.locale) {
            //setLanguage(locale);
            router.push(router.pathname, router.asPath, {
                locale,
            });
        }
    }, [router.locale, locale]);
    return children;
};
