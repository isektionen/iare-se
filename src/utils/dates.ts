import {
    format,
    formatDistanceToNow,
    formatDistanceToNowStrict,
} from "date-fns";
import { enGB, sv } from "date-fns/locale";
import { ComponentJobYear, Maybe } from "../types/strapi";

const supportedLocales: { [k: string]: any } = {
    en: enGB,
    sv,
};

export const getDate = (
    dateString: string,
    formatString: string = "EEEE d MMM",
    locale: string = "sv"
) =>
    format(new Date(dateString), formatString, {
        locale: supportedLocales[locale],
    });

export const getTime = (dateString: string, locale: string = "sv") =>
    format(new Date(dateString), "HH : mm", {
        locale: supportedLocales[locale],
    });

export const getTimeLeft = (
    dateString: string,
    strict: boolean = false,
    locale: string = "sv"
) => {
    const fn = strict ? formatDistanceToNowStrict : formatDistanceToNow;
    /* @ts-ignore */
    return fn(new Date(dateString), {
        addSuffix: true,
        locale: supportedLocales[locale],
    });
};

export const getSchoolYear = (jobYear: Maybe<ComponentJobYear>) => {
    if (!jobYear) return 0;
    switch (jobYear.year) {
        case "YEAR_ONE":
            return 1;
        case "YEAR_TWO":
            return 2;
        case "YEAR_THREE":
            return 3;
        case "YEAR_FOUR":
            return 4;
        case "YEAR_FIVE":
            return 5;
        default:
            return 0;
    }
};
