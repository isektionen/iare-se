import React, { ReactNode } from "react";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import {
    a,
    br,
    code,
    heading,
    hr,
    img,
    inlineCode,
    li,
    ol,
    p,
    pre,
    strong,
    ul,
} from "./Components";
import { Box } from "@chakra-ui/react";

interface Props {
    source: MDXRemoteSerializeResult;
}

const custom = (props: any) => (
    <Box bg="gray.900" {...props}>
        CUSTOM
    </Box>
);

export const MDXLayout = ({ source }: Props) => {
    const components = {
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
        code,
        img,
    };
    return (
        <Box py={12}>
            <MDXRemote {...source} components={components} />
        </Box>
    );
};
