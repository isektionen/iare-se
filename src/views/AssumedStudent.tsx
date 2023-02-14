import { Stack, Box, Heading, VStack } from "@chakra-ui/layout";
import { MDXLayout } from "components/mdx/Layout";
import { NextImage } from "components/NextImage";
import { useSanity } from "hooks/use-check-error";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { NextSeo } from "next-seo";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import { useHydrater } from "state/layout";
import { LayoutProps } from "types/global";
import { UploadFile } from "types/strapi";
import { makeTitle } from "utils/seo";

interface Props {
    title: string;
    images: UploadFile[];
    mdx: MDXRemoteSerializeResult;
}

const View = ({
    title,
    images,
    mdx,
    header,
    footer,
    error,
}: LayoutProps<Props>) => {
    const { t } = useTranslation();
    useSanity(error);
    useHydrater({ header, footer });

    const hasImages = images.length > 0;

    return (
        <React.Fragment>
            <NextSeo title={makeTitle(title)} />
            <Stack
                p={{ base: "0.5em", md: "2em" }}
                margin="0 auto"
                w={{ base: "100%", sm: "80%", md: "60%" }}
                direction={{ base: "column-reverse", md: "row" }}
            >
                <Box minW={{ base: "full", md: "70%" }}>
                    <Heading mb={8}>{title}</Heading>
                    {mdx && <MDXLayout source={mdx} flex={1} />}
                </Box>
                {hasImages && (
                    <VStack spacing={4} w={{ base: "full", md: "30%" }}>
                        {images.map((image, i) => (
                            <NextImage
                                key={image.id}
                                src={image.url}
                                priority={i < 3}
                                width={900}
                                w="full"
                                height={600}
                                layout="intrinsic"
                            />
                        ))}
                    </VStack>
                )}
            </Stack>
        </React.Fragment>
    );
};

export default View;
