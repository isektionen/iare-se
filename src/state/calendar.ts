import {
    addDays,
    addMonths,
    eachDayOfInterval,
    endOfMonth,
    endOfWeek,
    format,
    getDate,
    getDay,
    isSameDay,
    isSameMonth,
    isToday,
    isWeekend,
    startOfMonth,
    startOfWeek,
    subDays,
    subMonths,
} from "date-fns";
import { nanoid } from "nanoid";
import { useCallback, useMemo, useState } from "react";
import {
    atom,
    atomFamily,
    selectorFamily,
    useRecoilState,
    useRecoilValue,
    useSetRecoilState,
} from "recoil";
import _ from "underscore";

export interface Appointment {
    label: string;
    href: string;
    start: Date;
    end: Date;
}

export interface Calendar {
    date: Date;
    monthDelta: number;
    appointments: Appointment[];
}

const defaultCalendars: Record<string, Calendar> = {};

const calendar = atom({
    key: "ATOMFAMILY/CALENDAR",
    default: defaultCalendars,
});

interface CalendarProps {
    weekStartWith:
        | "monday"
        | "tuesday"
        | "wednesday"
        | "thursday"
        | "friday"
        | "saturday"
        | "sunday";
    key: string;
    renderPreviousMonthDays?: boolean;
    renderNextMonthDays?: boolean;
    locale: Locale;
    formatLabel?: string;
    formatMonth?: string;
    appointments: Appointment[];
}

const getActiveMonth = selectorFamily({
    key: "SELECTORFAMILY/ACTIVEMONTH",
    get:
        (key: string) =>
        ({ get }) => {
            const states = get(calendar);
            if (_.has(states, key)) {
                const { monthDelta, date } = states[key];
                return addMonths(date, monthDelta);
            }
        },
});

export const useCalendar = ({
    weekStartWith,
    key,
    appointments: _appointments,
    locale,
    renderNextMonthDays = true,
    renderPreviousMonthDays = true,
    formatLabel = "EEE",
    formatMonth = "MMMM yyyy",
}: CalendarProps) => {
    //const [state, setState] = useRecoilState(calendar);
    //const activeMonth = useRecoilValue(getActiveMonth(key));
    const [state, setState] = useState<Calendar>({
        date: new Date(),
        monthDelta: 0,
        appointments: _appointments,
    });

    const activeMonth = useMemo(
        () => addMonths(state.date, state.monthDelta),
        [state.date, state.monthDelta]
    );

    const week2num: Record<string, 0 | 1 | 2 | 3 | 4 | 5 | 6> = {
        sunday: 0,
        monday: 1,
        tuesday: 2,
        wednesday: 3,
        thursday: 4,
        friday: 5,
        saturday: 6,
    };

    const firstDayOfWeek = week2num[weekStartWith];

    const labels = eachDayOfInterval({
        start: addDays(startOfWeek(state.date), firstDayOfWeek),
        end: addDays(endOfWeek(state.date), firstDayOfWeek),
    }).map((date) => format(date, "EEE", { locale }));

    // Before & after months dates

    const _days = useMemo(() => {
        const _startOfMonth = startOfMonth(activeMonth);
        const _endOfMonth = endOfMonth(activeMonth);
        const dayOfWeek = getDay(_startOfMonth);
        const daysInAWeek = 6;
        const daysLeftOfMonthBefore =
            dayOfWeek - 1 < 0 ? daysInAWeek : dayOfWeek - 1;
        const previousDays =
            daysLeftOfMonthBefore > 0
                ? eachDayOfInterval({
                      start: subDays(_startOfMonth, daysLeftOfMonthBefore),
                      end: subDays(_startOfMonth, 1),
                  })
                : [];
        const currentDays = eachDayOfInterval({
            start: _startOfMonth,
            end: _endOfMonth,
        });

        const daysLeft = renderPreviousMonthDays
            ? 42 - (previousDays.length + currentDays.length)
            : 42 - currentDays.length;
        const nextDays = eachDayOfInterval({
            start: addDays(_endOfMonth, 1),
            end: addDays(_endOfMonth, daysLeft),
        });
        let result: Date[] = [];

        if (renderPreviousMonthDays) {
            result.push(...previousDays);
        }
        result.push(...currentDays);
        if (renderNextMonthDays) {
            result.push(...nextDays);
        }
        return result;
    }, [activeMonth, renderNextMonthDays, renderPreviousMonthDays]);

    const keyFormat = (date: Date) => format(date, "yyyyMMdd");

    const groupedAppointments: Record<string, Appointment[]> = _.groupBy(
        state.appointments,
        ({ start }) => {
            return keyFormat(start);
        }
    );

    const extendDate = useCallback(
        (date: Date, index: number) => {
            const appointmentKey = keyFormat(date);
            return {
                label: getDate(date),
                index,
                date,
                isToday: isToday(date),
                isWeekend: isWeekend(date),
                isSameMonth: isSameMonth(date, activeMonth),
                appointments: _.has(groupedAppointments, appointmentKey)
                    ? _.sortBy(groupedAppointments[appointmentKey], "start")
                    : null,
            };
        },
        [activeMonth, groupedAppointments]
    );

    const days = useMemo(() => _days.map(extendDate), [_days, extendDate]);

    const month = useMemo(
        () => format(activeMonth, formatMonth),
        [activeMonth, formatMonth]
    );

    const goBackward = useCallback(() => {
        setState({ ...state, monthDelta: state.monthDelta - 1 });
    }, [state]);
    const goForward = useCallback(() => {
        setState({ ...state, monthDelta: state.monthDelta + 1 });
    }, [state]);

    const goToday = useCallback(() => {
        setState({ ...state, monthDelta: 0 });
    }, [state]);

    return {
        labels,
        days,
        month,
        goForward,
        goBackward,
        goToday,
    };
};
