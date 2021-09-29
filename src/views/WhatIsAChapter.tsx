import { Stack, Heading, Wrap, Avatar, VStack, Text } from "@chakra-ui/react";
import { MDXLayout } from "components/mdx/Layout";
import Box from "components/motion/Box";
import { NextImage } from "components/NextImage";
import { useSanity } from "hooks/use-check-error";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import React from "react";
import { useHydrater } from "state/layout";
import { LayoutProps } from "types/global";
import { UploadFile, Committee } from "types/strapi";
import _ from "underscore";

interface Props {
    title: string;
    images: UploadFile[];
    board: Committee;
    mdx: MDXRemoteSerializeResult;
}

const View = ({
    title,
    images,
    mdx,
    board,
    header,
    footer,
    error,
}: LayoutProps<Props>) => {
    useSanity(error);
    useHydrater({ header, footer });
    return (
        <Stack
            py={8}
            px={{ base: 4, md: 12 }}
            spacing={8}
            direction={{ base: "column-reverse", md: "row" }}
        >
            <Box minW={{ base: "full", md: "60%" }}>
                <Heading mb={8}>{title}</Heading>
                {mdx && <MDXLayout source={mdx} flex={1} />}
                <Wrap shouldWrapChildren justify="center" w="full">
                    {board.representatives?.map((rep) => {
                        const fullname =
                            rep?.user?.firstname + " " + rep?.user?.lastname;
                        const role = _.first(
                            rep?.committee_roles?.map((_role) => ({
                                role: _role?.role,
                                abbr: _role?.abbreviation?.toUpperCase(),
                            })) as { role: string; abbr: string }[]
                        );
                        const roleName =
                            role && role?.role?.length > 20
                                ? role?.abbr || role?.role.slice(0, 17) + "..."
                                : role?.role;
                        if (!rep) return <></>;
                        return (
                            <Box key={rep.id} p={2} maxW="full">
                                <Avatar
                                    src={rep?.cover?.url}
                                    name={fullname}
                                    size="lg"
                                    rounded="sm"
                                    w="167px"
                                    h="250px"
                                    mb={4}
                                />

                                <Text fontSize="lg" textTransform="capitalize">
                                    {fullname}
                                </Text>
                                <Text textTransform="capitalize">
                                    {roleName}
                                </Text>
                            </Box>
                        );
                    })}
                </Wrap>
            </Box>
            <VStack spacing={4} w={{ base: "full", md: "40%" }}>
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
        </Stack>
    );
};

export default View;
