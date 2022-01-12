export const changeLocaleData = (locale: string | undefined, data: any) => {
    if (data.locale === locale) {
        // delete data.localizations
        return data;
    }
    if (locale && data.localizations && data.localizations.length > 0) {
        const other = data.localizations.find(
            (l: { locale: string }) => l.locale === locale
        );
        if (other) {
            return other;
        }
    }
    return data;
};

export const conformLocale = (locale: string | undefined): string => {
    if (process.env.NODE_ENV === "production") {
        return locale || "sv";
    }
    return (
        (locale === "sv" ? process.env.NEXT_PUBLIC_BACKEND_LOCALE : locale) ||
        "sv"
    );
};
