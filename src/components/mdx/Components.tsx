import {
    chakra,
    ImageProps as ChakraImageProps,
    Box,
    BoxProps,
    Heading,
} from "@chakra-ui/react";
import NextImage, { ImageProps as NextImageProps } from "next/image";
import React from "react";

export type ImageProps = NextImageProps & ChakraImageProps;

export const Image = () => {
    const ChakraImage = chakra(NextImage, {
        baseStyle: {
            maxH: 120,
            maxW: 120,
        },
        shouldForwardProp: (prop) =>
            ["width", "height", "src", "alt"].includes(prop),
    });
    return ChakraImage;
};

export const heading = ({ as }: any) => {
    switch (as) {
        case "h1":
            return function h1(props: any) {
                return <Heading as="h1" mb={4} {...props} />;
            };
        case "h2":
            return function h2(props: any) {
                return <chakra.h2 {...props} />;
            };
        case "h3":
            return function h3(props: any) {
                return <chakra.h3 {...props} />;
            };
        case "h4":
            return function h4(props: any) {
                return <chakra.h4 {...props} />;
            };
        case "h5":
            return function h5(props: any) {
                return <chakra.h5 {...props} />;
            };
        case "h6":
            return function h6(props: any) {
                return <chakra.h6 {...props} />;
            };
    }
};

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
export const a = React.forwardRef(function a(props: any, ref: any) {
    return <chakra.a ref={ref} {...props} />;
});
export const p = (props: any) => <chakra.p mb={4} {...props} />;
export const ul = (props: any) => <chakra.ul ml={4} mb={4} {...props} />;
export const ol = (props: any) => <chakra.ol {...props} />;
export const li = (props: any) => <chakra.li {...props} />;
