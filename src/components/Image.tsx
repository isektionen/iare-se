import { Box, BoxProps } from "@chakra-ui/react";
import NextImage, { ImageProps as NextImageProps } from "next/image";
import { isExternal } from "utils/path";

export type ImageProps = Omit<NextImageProps> & BoxProps;

export const Image = (props: ImageProps) => {
    const { src, alt, width, height, ...rest } = props;
    const external = isExternal(src as string);
    const source = external
        ? src
        : process.env.NEXT_PUBLIC_STRAPI_BACKEND_URL + src;

    return (
        <Box {...rest}>
            <NextImage
                src={source as string}
                alt={alt}
                layout="intrinsic"
                width={width}
                height={height}
            />
        </Box>
    );
};
