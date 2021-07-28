import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState } from "react";

interface Props {
    locale: string;
    localizations: { locale: string }[];
}

export const useLocale = <T extends Props>(data: T) => {
    const { lang } = useTranslation();
    const [result, setResult] = useState(data);
    useEffect(() => {
        if (data && data.locale) {
            if (data.locale !== lang) {
                const _data = data.localizations.find(
                    (l) => l.locale === lang
                ) as unknown as T;
                if (_data) {
                    setResult(_data);
                }
            }
        }
    }, [lang]);
    return result;
};
