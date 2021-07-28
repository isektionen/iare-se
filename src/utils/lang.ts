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
    console.log("NO LOCALE VERSION FOUND");
    return data;
};
