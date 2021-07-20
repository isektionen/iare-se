import React, { ReactNode } from "react";
import { MDXProvider } from "@mdx-js/react";

interface Props {
    children: ReactNode | ReactNode[];
}

export const MDXLayout = ({ children }: Props) => {
    return <MDXProvider components={{}}>{children}</MDXProvider>;
};
