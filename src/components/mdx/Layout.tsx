import React, { ReactNode } from "react";
import { MDXProvider, MDXProviderComponentsProp } from "@mdx-js/react";
import {
    a,
    br,
    heading,
    hr,
    inlineCode,
    li,
    ol,
    p,
    pre,
    strong,
    ul,
} from "./Components";

interface Props {
    children: ReactNode | ReactNode[];
}

export const MDXLayout = ({ children }: Props) => {
    const components: MDXProviderComponentsProp = {
        h1: heading({ as: "h1" }),
        h2: heading({ as: "h2" }),
        h3: heading({ as: "h3" }),
        h4: heading({ as: "h4" }),
        h5: heading({ as: "h5" }),
        h6: heading({ as: "h6" }),
        hr,
        br,
        strong,
        inlineCode,
        pre,
        a,
        p,
        ul,
        ol,
        li,
    };
    return <MDXProvider components={components}>{children}</MDXProvider>;
};
