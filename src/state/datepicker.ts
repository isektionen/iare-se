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
} from "date-fns";
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
}

const defaultState = {
    startDate: null,
    firstDayOfWeek: 1 as 0 | 1 | 2 | 3 | 4 | 5 | 6,
    endDate: null,
    focusedInput: null,
    activeMonth: new Date(),
    isInterval: true,
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

const selectMonth = selector({
    key: "SELECTOR/DATEPICKER/MONTH",
    get: ({ get }) => {
        const { activeMonth, firstDayOfWeek } = get(dateState);
        const month = activeMonth;
        const today = new Date();
        const date = month;
        const monthStart = startOfMonth(date);
        const monthEnd = endOfMonth(date);
        const monthStartDay = 6 - getDay(monthStart) - firstDayOfWeek;

        const dateMap = (d: Date) => ({
            day: getDate(d),
            date: d,
        });

        let days = [
            ...eachDayOfInterval({
                start: subDays(monthStart, monthStartDay + firstDayOfWeek),
                end: subDays(monthStart, 1),
            }).map(dateMap),
            ...eachDayOfInterval({
                start: monthStart,
                end: monthEnd,
            }).map(dateMap),
        ];
        days = [
            ...days,
            ...eachDayOfInterval({
                start: addDays(monthEnd, 1),
                end: addDays(monthEnd, 42 - days.length),
            }).map(dateMap),
        ];
        const weekdayLabels = eachDayOfInterval({
            start: addDays(startOfDay(today), firstDayOfWeek),
            end: addDays(endOfWeek(today), firstDayOfWeek),
        }).map((date) => format(date, "EEE"));
        return {
            monthLabel: format(date, "MMMM yyyy"),
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
}

export const useDatepicker = ({ isInterval }: useDatepickerProps) => {
    const [{ focusedInput, startDate, endDate }, setState] =
        useRecoilState(dateState);

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

    useEffect(() => {
        const { date } = activeMonths[0];
        setState((state) => ({
            ...state,
            activeMonth: date,
            firstDayOfWeek,
            isInterval: isInterval ? true : false,
        }));
    }, [activeMonths, firstDayOfWeek, isInterval, setState]);
    return {
        startDate,
        endDate: endDate && isInterval ? endDate : null,
        firstDayOfWeek,
        goToPreviousMonths,
        goToNextMonths,
    };
};
