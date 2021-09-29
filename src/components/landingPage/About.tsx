import { MDXLayout } from "components/mdx/Layout";
import Box from "components/motion/Box";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import React from "react";

export const About = ({ mdx }: { mdx: MDXRemoteSerializeResult | null }) => {
    return (
        <Box py={8} px={{ base: 4, md: 12 }}>
            {mdx && <MDXLayout w="full" source={mdx} />}
        </Box>
    );
};
