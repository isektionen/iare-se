import { format, formatDistanceToNow } from "date-fns";
import { enGB, sv } from "date-fns/locale";

export const getDate = (dateString: string) =>
    format(new Date(dateString), "EEEE d MMM", { locale: sv });

export const getTime = (dateString: string) =>
    format(new Date(dateString), "HH : mm", { locale: sv });

export const getTimeLeft = (dateString: string) =>
    formatDistanceToNow(new Date(dateString), {
        addSuffix: true,
        locale: sv,
    });
