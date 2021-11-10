export const makeTitle = (title: string, onLeft: boolean = true) => {
    if (onLeft) {
        return "Iare - " + title;
    }
    return title + " - Iare";
};
