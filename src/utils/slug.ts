export const slugifyTicketReference = (str: String) => {
    const newStr = str.replaceAll(" ", ".").toLowerCase();
    return newStr;
};
