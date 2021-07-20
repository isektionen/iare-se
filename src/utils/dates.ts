import { format, formatDistanceToNow } from "date-fns";
import { enGB, sv } from "date-fns/locale";
import { ComponentJobYear, Maybe } from "../types/strapi";
export const getDate = (
    dateString: string,
    formatString: string = "EEEE d MMM"
) => format(new Date(dateString), formatString, { locale: sv });

export const getTime = (dateString: string) =>
    format(new Date(dateString), "HH : mm", { locale: sv });

export const getTimeLeft = (dateString: string) =>
    formatDistanceToNow(new Date(dateString), {
        addSuffix: true,
        locale: sv,
    });

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
