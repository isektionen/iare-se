import { Box, BoxProps, Center, Flex } from "@chakra-ui/react";
import Image, { ImageProps } from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { isExternal } from "utils/path";

export type NextImageProps = ImageProps & BoxProps;

interface StaticImageData {
    src: string;
    height: number;
    width: number;
    blurDataURL?: string;
}

export const NextImage = (props: NextImageProps) => {
    const {
        src,
        layout,
        objectFit,
        objectPosition,
        height,
        width,
        alt,
        priority,
        ...rest
    } = props;
    return (
        <Flex position="relative" overflow="hidden" h="full" {...rest}>
            {layout === "fill" && (
                <Image
                    alt={alt || "image"}
                    src={src as any}
                    layout={layout}
                    priority={priority ? true : false}
                    objectFit={objectFit || "cover"}
                    objectPosition={objectPosition || "center"}
                />
            )}
            {layout !== "fill" && width && height && (
                <Image
                    alt={alt || "image"}
                    src={src as any}
                    width={width}
                    height={height}
                    layout={layout}
                    priority={priority ? true : false}
                />
            )}
        </Flex>
    );
};
