interface Props {
    text: string;
    wpm?: number;
    suffix?: string[];
}

export const estimateReadingMinutes = ({
    text,
    wpm = 140,
    suffix = ["minute read", "minutes read"],
}: Props) => {
    if (!text) return "";
    const minutes = Math.ceil(text.split(" ").length / wpm);
    if (minutes > 1) return `${minutes} ${suffix[1]}`;
    return `${minutes} ${suffix[0]}`;
};

export const getReadingTime = (text: string, wpm: number = 140) => {
    if (text === undefined) {
        return 0;
    }
    return Math.ceil(text.split(" ").length / wpm);
};

export const validateEmail = (email: string) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

export const capitalize = (text: string) =>
    text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
