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
import { Box, BoxProps } from "@chakra-ui/react";
import { Contact } from "./committee/Contact";

interface Props extends BoxProps {
    source: MDXRemoteSerializeResult;
}

export const MDXLayout = ({ source, ...props }: Props) => {
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
        contact: function contact(props: any) {
            return <Contact {...props} />;
        },
    };
    return (
        <Box {...props}>
            <MDXRemote {...source} components={components} />
        </Box>
    );
};
