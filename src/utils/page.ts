export interface PageRange {
    start: number;
    end: number;
}

export const removeDuplicates = <T>(array: T[]) =>
    array.reduce(function (a, b) {
        if (a.indexOf(b) < 0) a.push(b);
        return a;
    }, [] as T[]);

export const makeRange = ({ start, end }: PageRange) =>
    [...Array(end - start)].map((_, i) => start + i);

export const separateChildren = (children: any[]) => {
    const internalChildren = children.find(
        (child) => typeof child === "function"
    );
    const externalChildren = children.filter(
        (child) => child !== internalChildren
    );
    return { internalChildren, externalChildren };
};

const makeMiddle = (pageSize: number, currentPage: number) => {
    if (pageSize - 2 === 1) {
        return [currentPage + 1];
    }
    return [...Array(pageSize - 2)].map((_, i) => currentPage + i);
};

export const makeWindow = (
    currentPage: number,
    pageQuantity: number,
    offset: number
) => {
    return [
        1,
        ...[...Array(pageQuantity)]
            .map((_, i) => i + 1)
            .slice(
                currentPage === pageQuantity
                    ? currentPage - 2
                    : currentPage - 1,
                currentPage + offset - 2
            ),
        pageQuantity,
    ];
};
