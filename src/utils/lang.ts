export const conformLocale = (locale: string | undefined): string => {
    if (process.env.NODE_ENV === "production") {
        return locale || "sv";
    }
    return (
        (locale === "sv" ? process.env.NEXT_PUBLIC_BACKEND_LOCALE : locale) ||
        "sv"
    );
};
