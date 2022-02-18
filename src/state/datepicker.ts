import { ButtonProps } from "@chakra-ui/button";
import { isDisabled } from "@chakra-ui/utils";
import {
    START_DATE,
    useDatepicker as useBaseDatePicker,
    OnDatesChangeProps,
    FocusedInput,
    MonthType,
} from "@datepicker-react/hooks";
import {
    eachDayOfInterval,
    endOfMonth,
    endOfWeek,
    format,
    getDate,
    getDay,
    startOfDay,
    startOfMonth,
    subMonths,
    addDays,
    subDays,
    isAfter,
    isThisMonth,
    isSameMonth,
    isToday,
    isBefore,
    differenceInDays,
    isWithinInterval,
    Locale,
    startOfWeek,
    getDaysInMonth,
} from "date-fns";
import { enGB } from "date-fns/locale";
import useTranslation from "next-translate/useTranslation";
import { RefObject, useCallback, useEffect, useMemo, useRef } from "react";
import {
    atom,
    selector,
    selectorFamily,
    useRecoilState,
    useRecoilValue,
} from "recoil";
import _ from "underscore";

interface DefaultState {
    startDate: null | Date;
    endDate: null | Date;
    focusedInput: null | Date | FocusedInput;
    activeMonth: Date;
    firstDayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    isInterval: boolean;
    locale: Locale;
}

const defaultState = {
    startDate: null,
    firstDayOfWeek: 1 as 0 | 1 | 2 | 3 | 4 | 5 | 6,
    endDate: null,
    focusedInput: null,
    activeMonth: new Date(),
    isInterval: true,
    locale: enGB,
};

const dateState = atom<DefaultState>({
    key: "ATOM/DATEPICKER",
    default: defaultState,
});

const selectDay = selectorFamily({
    key: "SELECTOR/DATEPICKER/DAY",
    get:
        (date: Date) =>
        ({ get }) => {
            const month = get(selectMonth);

            return {
                day: getDate(date),
                date,
            };
        },
});

/**
 * Days should be a array always containing 42 days in it.
 * The first week should always be on the first row. (the first 7 elements)
 * If the month starts on a friday, it should mean that MON-THU should come
 * from the previous month. This can be done through date-math, where we
 * extract what day the current month starts on, then subtract that from 7.
 *
 * today = new Date()
 * som = startOfMonth(today)
 * >> Date
 * getDay(som)
 * >> number // 0-6, where 0 represents SUN
 *
 *
 * [1,   2,   3,   4,   5,   6,   0  ]
 * [MON, TUE, WED, THU, FRI, SAT, SUN]
 *                           x
 * daysFromLastMonth = getDay(som) - 1
 * >> number
 *
 *
 * start = subDays(som, daysFromLastMonth)
 * ----
 * A calendar is a grid of 6 rows and 7 columns, meaning that
 * 42 cells exists for each month.
 * We know from before the amount of extra days from the previous
 * month (daysFromLastMonth) and we can get the amount of days that the
 * current month has:
 * daysInMonth = getDaysInMonth(today)
 * >> number
 *
 * Thus ending up with this calculation:
 * daysFromNextMonth = 42 - (daysInMonth + daysFromLastMonth)
 * >> number
 *
 * end = addDays(endOfMonth(today), daysFromNextMonth)
 */

const calendarDays = (today: Date) => {
    const daysFromLastMonth = getDay(startOfMonth(today)) - 1;
    const start = subDays(startOfMonth(today), daysFromLastMonth);
    const end = addDays(
        endOfMonth(today),
        42 - (getDaysInMonth(today) + daysFromLastMonth)
    );

    return eachDayOfInterval({
        start,
        end,
    });
};

const selectMonth = selector({
    key: "SELECTOR/DATEPICKER/MONTH",
    get: ({ get }) => {
        const { activeMonth, firstDayOfWeek, locale } = get(dateState);
        const month = activeMonth;
        const today = new Date();

        const dateMap = (d: Date) => ({
            day: getDate(d),
            date: d,
        });

        const days = calendarDays(today).map(dateMap);

        const weekdayLabels = eachDayOfInterval({
            start: addDays(startOfWeek(today), firstDayOfWeek),
            end: addDays(endOfWeek(today), firstDayOfWeek),
        }).map((date) => format(date, "EEE", { locale }));
        return {
            monthLabel: format(month, "MMMM yyyy", { locale }),
            weekdayLabels,
            days,
        };
    },
});

export const useMonth = () => {
    const month = useRecoilValue(selectMonth);
    return month;
};

export const useDatepickerState = () => {
    const [state, setState] = useRecoilState(dateState);

    const reset = () => setState(defaultState);
    return { ...state, reset };
};

export const useDay = (_date: Date) => {
    const [{ startDate, endDate, activeMonth, isInterval }, setState] =
        useRecoilState(dateState);

    const { date, day } = useRecoilValue(selectDay(_date));
    const dayRef = useRef<HTMLButtonElement>(null);
    const onClick = () => {
        if (!startDate) {
            setState((state) => ({ ...state, startDate: date }));
            return;
        }

        if (startDate && !isInterval) {
            setState((state) => ({ ...state, startDate: date }));
            return;
        }

        if (startDate && !endDate && isAfter(date, startDate) && isInterval) {
            setState((state) => ({ ...state, endDate: date }));
            return;
        }
        if (startDate && !endDate && isBefore(date, startDate) && isInterval) {
            setState((state) => ({ ...state, startDate: date }));
            return;
        }
        if (startDate && endDate && isInterval) {
            const differenceFromStart = Math.abs(
                differenceInDays(date, startDate)
            );
            const differenceFromEnd = Math.abs(differenceInDays(date, endDate));
            if (differenceFromStart <= differenceFromEnd) {
                setState((state) => ({ ...state, startDate: date }));
                return;
            } else {
                setState((state) => ({ ...state, endDate: date }));
                return;
            }
        }
    };

    const isStart = useMemo(() => {
        return startDate === date;
    }, [date, startDate]);

    const isEnd = useMemo(() => {
        return endDate === date && isInterval;
    }, [date, endDate, isInterval]);

    const isSelected = useMemo(() => {
        if (isStart || isEnd) {
            return true;
        }
        const today = isToday(date);
        const emptyDates = !endDate && !startDate;
        return today && emptyDates;
    }, [date, endDate, isEnd, isStart, startDate]);

    const isBetween = useMemo(() => {
        return (
            isInterval &&
            startDate &&
            endDate &&
            isWithinInterval(date, { start: startDate, end: endDate })
        );
    }, [date, endDate, isInterval, startDate]);

    const borderRadius = "md";

    const register: Partial<ButtonProps> & {
        ref: RefObject<HTMLButtonElement>;
    } = {
        ref: dayRef,
        onClick,
        borderRadius: isSelected ? borderRadius : "none",
        borderLeftRadius:
            isInterval && isStart && endDate ? borderRadius : "none",
        borderRightRadius:
            isInterval && isEnd && startDate ? borderRadius : "none",

        bg: isSelected ? "gray.900" : isBetween ? "gray.200" : "gray.50",
        color: isSelected ? "white" : "gray.900",
        _hover: {
            bg: isSelected ? "gray.700" : "gray.200",
            _disabled: isSelected ? "gray.600" : "gray.50",
        },
        isDisabled: !isSameMonth(activeMonth, date),
    };

    return {
        day,
        register,
    };
};

interface useDatepickerProps {
    isInterval?: boolean;
    locale: Locale;
}

export const useDatepicker = ({ isInterval, locale }: useDatepickerProps) => {
    const [{ focusedInput, startDate, endDate }, setState] =
        useRecoilState(dateState);

    const reset = () => setState(defaultState);

    const onDatesChange = ({
        focusedInput = START_DATE,
        startDate,
        endDate,
    }: OnDatesChangeProps) => {
        setState((state) => ({ ...state, focusedInput, startDate, endDate }));
    };

    const { firstDayOfWeek, activeMonths, goToPreviousMonths, goToNextMonths } =
        useBaseDatePicker({
            startDate,
            endDate,
            focusedInput: START_DATE,
            onDatesChange,
            numberOfMonths: 1,
        });

    const setLocale = useCallback(
        (locale: Locale) => {
            setState((state) => ({ ...state, locale }));
        },
        [setState]
    );

    useEffect(() => {
        const { date } = activeMonths[0];
        setState((state) => ({
            ...state,
            activeMonth: date,
            firstDayOfWeek,
            isInterval: isInterval ? true : false,
            locale,
        }));
    }, [activeMonths, firstDayOfWeek, isInterval, locale, setState]);

    return {
        reset,
        startDate,
        setLocale,
        endDate: endDate && isInterval ? endDate : null,
        firstDayOfWeek,
        goToPreviousMonths,
        goToNextMonths,
    };
};
