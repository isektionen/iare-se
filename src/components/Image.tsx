import { Box, BoxProps } from "@chakra-ui/react";
import NextImage, { ImageProps as NextImageProps } from "next/image";
import { isExternal } from "utils/path";

export type ImageProps = Omit<
    NextImageProps,
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

export const Image = (props: ImageProps) => {
    const { src, alt, width, height, ...rest } = props;
    const external = isExternal(src as string);
    const base = process.env.NEXT_PUBLIC_STRAPI_BACKEND_URL as string;
    const source = external ? src : base + src;

    return (
        <Box {...rest}>
            <NextImage
                src={source as any}
                alt={alt}
                layout="intrinsic"
                width={width}
                height={height}
            />
        </Box>
    );
};
