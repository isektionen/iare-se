export const Kottnet = (
    path: TemplateStringsArray,
    ...variables: (string | number)[]
) => {
    return (
        "https://api.kottnet.net/kth" +
        path.map((p, i) => p + (variables[i] ? variables[i] : "")).join("")
    );
};
