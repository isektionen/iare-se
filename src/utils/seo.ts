export const makeTitle = (title: string, onLeft: boolean = true) => {
    if (onLeft) {
        return "Iare - " + title;
    }
    return title + " - Iare";
};

export const getPage = (slug: string) => {
    return "https://www.iare.se/" + slug;
};
