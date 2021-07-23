import { Box, BoxProps, Center } from "@chakra-ui/react";
import Image, { ImageProps } from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { isExternal } from "utils/path";

export type NextImageProps = Omit<
    ImageProps,
    "src" | "placeholder" | "blurDataURL"
> & {
    src: string;
} & BoxProps;

interface StaticImageData {
    src: string;
    height: number;
    width: number;
    blurDataURL?: string;
}

export const NextImage = (props: NextImageProps) => {
    const { src, alt, layout, objectFit, objectPosition, ...rest } = props;
    /*
    const external = isExternal(src as string);
    const base = process.env.NEXT_PUBLIC_STRAPI_BACKEND_URL as string;
    const source = external ? src : base + src;
    */
    const ref = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({
        height: 0,
        width: 0,
    });
    useEffect(() => {
        if (ref.current) {
            const node = ref.current;
            const { height, width } = node.getBoundingClientRect();
            setDimensions({
                height,
                width,
            });
        }
    }, [ref]);

    if (layout === "fill") {
        return (
            <Center ref={ref} {...rest}>
                <Image
                    src={src}
                    alt={alt}
                    layout={layout}
                    objectFit={objectFit}
                    objectPosition={objectPosition}
                />
            </Center>
        );
    }
    return (
        <Box ref={ref} {...rest}>
            <Image
                src={src}
                alt={alt}
                layout={layout}
                objectFit={objectFit}
                width={dimensions.width}
                height={dimensions.height}
                objectPosition={objectPosition}
            />
        </Box>
    );
};
