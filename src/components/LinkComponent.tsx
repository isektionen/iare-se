import React from "react";
import NextLink from "next/link";
import {
    As,
    Box,
    BoxProps,
    ButtonOptions,
    ButtonProps,
    chakra,
    ComponentWithAs,
    forwardRef,
    HTMLChakraProps,
} from "@chakra-ui/react";

interface Props extends BoxProps, ButtonOptions {
    href: string;
    size?: string;
    variant?: string;
    children: any;
}

export const LinkComponent = <T,>(props: Props) => {
    const { href, as, children, ...rest } = props;

    return (
        <NextLink href={href as any} passHref>
            <chakra.a>
                <Box as={as} {...rest}>
                    {children}
                </Box>
            </chakra.a>
        </NextLink>
    );
};
