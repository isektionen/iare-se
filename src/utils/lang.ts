export const conformLocale = (locale: string | undefined): string => {
    return locale === "sv"
        ? (process.env.NEXT_PUBLIC_BACKEND_LOCALE as string)
        : (locale as string);
};
