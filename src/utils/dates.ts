import { format } from "date-fns";
import { enGB, sv } from "date-fns/locale";

export const getDate = (dateString: string) =>
    format(new Date(dateString), "EEEE d MMM yyyy", { locale: sv });
