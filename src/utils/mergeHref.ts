export const mergeLink = (...hrefs: string[]) =>
    hrefs.reduce((link, href) => {
        if (href === "/") return link;
        return link + href;
    }, "");
