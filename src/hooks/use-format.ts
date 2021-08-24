import useTranslation from "next-translate/useTranslation";
import { sv, enGB } from "date-fns/locale";
import { Dict } from "@chakra-ui/utils";

type WeekStartsOn = 0 | 1 | 2 | 3 | 4 | 5 | 6;

interface Options {
    locale?: Locale;
    weekStartsOn?: WeekStartsOn;
    firstWeekContainsDate?: number;
    useAdditionalWeekYearTokens?: boolean;
    useAdditionalDayOfYearTokens?: boolean;
}

type Format = (
    date: Date | number,
    format: string,
    options?: Options
) => string;
type FormatDistance = (
    date: Date | number,
    baseDate: Date | number,
    options?: Options
) => string;
type FormatFunctionType = Format | FormatDistance;

const locales: Record<string, Locale> = {
    sv: sv,
    en: enGB,
};

export const useFormat = (formatFunction: FormatFunctionType) => {
    const { lang } = useTranslation();

    const locale = locales[lang];

    type params = Parameters<typeof formatFunction>;

    return (...args: params) => {
        const [date, formatOrBaseDate, ...rest] = args;
        if (typeof formatOrBaseDate === "string") {
            return formatFunction(date, formatOrBaseDate as any, {
                locale,
            }) as unknown as Format;
        }
        return formatFunction(date, formatOrBaseDate as any, {
            locale,
        }) as unknown as FormatDistance;
    };
};

export const useDynamicLocale = () => {
    const { lang } = useTranslation();

    return locales[lang];
};
