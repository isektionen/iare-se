import _ from "underscore";

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

const WORDS = [
    "ad",
    "adipisicing",
    "aliqua",
    "aliquip",
    "amet",
    "anim",
    "aute",
    "cillum",
    "commodo",
    "consectetur",
    "consequat",
    "culpa",
    "cupidatat",
    "deserunt",
    "do",
    "dolor",
    "dolore",
    "duis",
    "ea",
    "eiusmod",
    "elit",
    "enim",
    "esse",
    "est",
    "et",
    "eu",
    "ex",
    "excepteur",
    "exercitation",
    "fugiat",
    "id",
    "in",
    "incididunt",
    "ipsum",
    "irure",
    "labore",
    "laboris",
    "laborum",
    "Lorem",
    "magna",
    "minim",
    "mollit",
    "nisi",
    "non",
    "nostrud",
    "nulla",
    "occaecat",
    "officia",
    "pariatur",
    "proident",
    "qui",
    "quis",
    "reprehenderit",
    "sint",
    "sit",
    "sunt",
    "tempor",
    "ullamco",
    "ut",
    "velit",
    "veniam",
    "voluptate",
];

interface ILorem {
    paragraphs?: number;
    words?: number;
}

export const lorem = ({ paragraphs = 2, words = 6 }: ILorem) => {
    const builtWords = _.range(0, paragraphs).flatMap((p) =>
        _.range(0, words + _.random(-4, 4)).map((pp) => {
            const cursor = _.random(0, WORDS.length - 1);
            return WORDS[cursor];
        })
    );
    return builtWords.join("\n\n");
};
