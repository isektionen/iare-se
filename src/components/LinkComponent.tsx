import React from "react";
import NextLink from "next/link";
import { As, Box, BoxProps, ButtonOptions, chakra } from "@chakra-ui/react";

interface Props extends BoxProps {
    href: string;
    size?: string;
    variant?: string;
    children: any;
    isDisabled?: boolean;
}

export const LinkComponent = <T,>(props: Props) => {
    const { href, as, children, ...rest } = props;

    return (
        <NextLink href={props.isDisabled ? "#" : (href as any)} passHref>
            <chakra.a>
                <Box as={as} {...rest}>
                    {children}
                </Box>
            </chakra.a>
        </NextLink>
    );
};
