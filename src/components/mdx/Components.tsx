import {
    chakra,
    ImageProps as ChakraImageProps,
    Box,
    BoxProps,
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

export const heading = (props: any) => {
    const { as, ...rest } = props;
    switch (as) {
        case "h1":
            return <chakra.h1 {...rest} />;
        case "h2":
            return <chakra.h2 {...rest} />;
        case "h3":
            return <chakra.h3 {...rest} />;
        case "h4":
            return <chakra.h4 {...rest} />;
        case "h5":
            return <chakra.h5 {...rest} />;
        case "h6":
            return <chakra.h6 {...rest} />;
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
export const p = (props: any) => <chakra.p {...props} />;
export const ul = (props: any) => <chakra.ul {...props} />;
export const ol = (props: any) => <chakra.ol {...props} />;
export const li = (props: any) => <chakra.li {...props} />;
