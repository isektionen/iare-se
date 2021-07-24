interface Props {
    text: string;
    wpm?: number;
    suffix?: string[];
}

export const estimateReadingMinutes = ({
    text,
    wpm = 180,
    suffix = ["minute read", "minutes read"],
}: Props) => {
    if (!text) return "";
    const minutes = Math.ceil(text.split(" ").length / wpm);
    if (minutes > 1) return `${minutes} ${suffix[1]}`;
    return `${minutes} ${suffix[0]}`;
};
