import {
    chakra,
    ImageProps as ChakraImageProps,
    Box,
    BoxProps,
    Heading,
    Link,
    Icon,
    Image,
    Center,
} from "@chakra-ui/react";
import NextLink from "next/link";
import Highlight, { Prism, PrismTheme } from "prism-react-renderer";
import { prismTheme } from "../../styles/highlightTheme";
import React from "react";
import AccessibleLink from "components/AccessibleLink";
import { HiOutlineExternalLink } from "react-icons/hi";
import { isExternal } from "utils/path";
import { Element } from "react-scroll";
import { NextImage } from "components/NextImage";

export const img = ({ alt, ...props }: any) => (
    <Center w="full">
        {/*
            <Image
                alt={alt ? alt : "No image alternative text was provided"}
                {...props}
            />
        */}
        <NextImage
            src={props.src}
            width={3000}
            height={2000}
            w="full"
            layout="intrinsic"
            {...props}
        />
    </Center>
);

export const heading = ({ as }: any) => {
    switch (as) {
        case "h1":
            return function h1(props: any) {
                return (
                    <Element name={props.children}>
                        <Heading as="h1" mb={4} size="xl" {...props} />
                    </Element>
                );
            };
        case "h2":
            return function h2(props: any) {
                return (
                    <Element name={props.children}>
                        <Heading as="h2" mb={4} size="lg" {...props} />
                    </Element>
                );
            };
        case "h3":
            return function h3(props: any) {
                return <Heading as="h3" mb={4} size="md" {...props} />;
            };
        case "h4":
            return function h4(props: any) {
                return <Heading as="h4" mb={4} size="sm" {...props} />;
            };
        case "h5":
            return function h5(props: any) {
                return <Heading as="h5" mb={4} size="xs" {...props} />;
            };
        case "h6":
            return function h6(props: any) {
                return (
                    <Heading
                        as="h6"
                        mb={4}
                        size="xs"
                        textTransform="uppercase"
                        {...props}
                    />
                );
            };
    }
};
export const code = ({ children, ...props }: any) => (
    <Highlight
        Prism={Prism}
        theme={prismTheme as PrismTheme}
        code={children}
        language={
            props.className
                ? props.className.replace("language-", "")
                : "javascript"
        }
    >
        {({ style, tokens, getLineProps, getTokenProps }) => (
            <Box
                as="pre"
                style={style}
                pt={6}
                px={2}
                w="max-content"
                {...props}
            >
                {tokens.map((line, i) => (
                    <div key={i} {...getLineProps({ line, key: i })}>
                        {line.map((token, key) => (
                            <span
                                key={key}
                                {...getTokenProps({ token, key })}
                            />
                        ))}
                    </div>
                ))}
            </Box>
        )}
    </Highlight>
);

export const inlineCode = (props: any) => <chakra.code {...props} />;
export const pre = (props: BoxProps) => (
    <chakra.div my="2em" borderRadius="sm" {...props} />
);

export const strong = (props: any) => <Box as="strong" {...props} />;
export const hr = (props: any) => <chakra.hr {...props} />;
export const br = ({ reset, ...props }: any) => (
    <Box
        as={reset ? "br" : undefined}
        height={reset ? undefined : "24px"}
        {...props}
    />
);
export const a = ({ href, children }: any) => {
    const external = isExternal(href);
    if (external) {
        return (
            <Link isExternal={external} href={href}>
                {children}
                <Icon mx={2} as={HiOutlineExternalLink} />
            </Link>
        );
    }
    return <NextLink href={href}>{children}</NextLink>;
};
export const p = (props: any) => <chakra.p mb={4} fontSize="lg" {...props} />;
export const ul = (props: any) => (
    <chakra.ul ml={4} mb={4} fontSize="lg" {...props} />
);
export const ol = (props: any) => <chakra.ol {...props} />;
export const li = (props: any) => <chakra.li {...props} />;
