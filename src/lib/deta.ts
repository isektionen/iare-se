export const Deta = (
    path: TemplateStringsArray,
    ...variables: (string | number)[]
) => {
    return (
        process.env.NEXT_PUBLIC_DETA +
        path.map((p, i) => p + (variables[i] ? variables[i] : "")).join("")
    );
};
