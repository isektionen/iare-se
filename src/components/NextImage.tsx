import { Box, BoxProps, Center, Flex } from "@chakra-ui/react";
import Image, { ImageProps } from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { isExternal } from "utils/path";

export type NextImageProps = Omit<ImageProps, "src"> &
    BoxProps & { src: string };

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
        <Flex w="max-content" h="fit-content" {...rest}>
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
                    objectFit={objectFit || "contain"}
                    objectPosition={objectPosition || "center"}
                    priority={priority ? true : false}
                />
            )}
        </Flex>
    );
};
