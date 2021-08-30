import {
    Box,
    BoxProps,
    Center,
    Flex,
    Heading,
    Spacer,
    Wrap,
    Text,
    Button,
    VStack,
    AspectRatio,
    Stack,
    chakra,
    Circle,
    Divider,
    useBreakpointValue,
} from "@chakra-ui/react";
import { LinkComponent } from "components/LinkComponent";
import { NextImage } from "components/NextImage";
import { GetStaticProps } from "next";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import { HiOutlineDownload } from "react-icons/hi";
import { fetchHydration, useHydrater } from "state/layout";
import { LayoutProps } from "types/global";

import _ from "underscore";
interface ISection extends BoxProps {
    title: string;
    children: any;
}

const Section = ({ title, children, ...props }: ISection) => {
    return (
        <Box
            as="section"
            w="full"
            minH="calc(100vh - 60px)"
            py={16}
            px={{ base: 3, md: 16 }}
            {...props}
        >
            <Heading mb={12} size="2xl">
                {title}
            </Heading>
            <Box>{children}</Box>
        </Box>
    );
};
interface IColor {
    name: string;
    hex: string;
    rgb?: string;
    size: number | string;
}

const Color = ({ hex, name, size }: IColor) => {
    return (
        <VStack
            w={size}
            h={size}
            p={4}
            rounded="lg"
            borderWidth={hex.startsWith("#ff") ? "1px" : "0"}
            borderColor="gray.200"
            overflow="hidden"
            justify="stretch"
            bg={hex}
            color={hex.startsWith("#ff") ? "black" : "white"}
            spacing={0.5}
        >
            <Text fontWeight="black" fontSize="lg" w="full">
                {name}
            </Text>
            <Text fontWeight="black" fontSize="lg" w="full">
                {hex.toUpperCase()}
            </Text>
        </VStack>
    );
};

interface ITypography {
    family: string;
    _for: string;
    types: {
        name: string;
        weight: number | string;
    }[];
    reverse?: boolean;
    description: string;
}

const capitalize = (text: string) =>
    text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();

const alphabet = (start: number) => {
    return _.range(start, start + 26)
        .map((i) => String.fromCharCode(i))
        .join("");
};
const Typography = ({
    family,
    _for,
    types,
    reverse,
    description,
}: ITypography) => {
    const isAboveMd = useBreakpointValue({ base: false, md: true });
    return (
        <Stack
            w="full"
            minH="100vh"
            direction={{ base: "column", md: "row" }}
            overflow="hidden"
        >
            <VStack
                py={{ base: 2, md: 16 }}
                pr={reverse ? 0 : 8}
                pl={!reverse ? 0 : 8}
                w={{ base: "full", md: "50%" }}
                h={{ base: "50%", md: "full" }}
                align={reverse ? "flex-end" : "flex-start"}
                spacing={16}
            >
                {isAboveMd && (
                    <Circle
                        size="xs"
                        bg="brand.200"
                        fontFamily={family}
                        fontSize={80}
                    >
                        Aa
                    </Circle>
                )}
                <Heading size="lg">{capitalize(family)}</Heading>
                {isAboveMd && <Divider />}
                <Box>
                    <Text fontSize="xl">{alphabet(65)}</Text>
                    <Text fontSize="xl">{alphabet(97)}</Text>
                </Box>
                <Text fontSize="xl">{description}</Text>
            </VStack>
            <Flex
                direction="column"
                w={{ base: "full", md: "50%" }}
                bg="brand.200"
                flex={1}
                justify="space-evenly"
                align="center"
            >
                {types.map((type) => (
                    <chakra.p
                        fontSize={72}
                        key={type.name + type.weight}
                        fontWeight={type.weight}
                        fontFamily={family}
                    >
                        {type.name}
                    </chakra.p>
                ))}
            </Flex>
        </Stack>
    );
};

const View = ({ header, footer }: LayoutProps<{}>) => {
    useHydrater({ header, footer });

    const { t } = useTranslation("brand");
    return (
        <VStack h="full" w="full" align="stretch">
            <Section title="Brand" bg="brand.200">
                <Flex w="full" h="full">
                    <Flex w="50%" direction="column">
                        <Text fontSize="lg">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Magni adipisci provident sunt numquam
                            voluptatem nulla atque perspiciatis quo
                            voluptatibus? Corporis nobis cumque iusto eum, hic
                            velit perspiciatis minus itaque molestias.
                        </Text>
                        <Spacer />
                        <LinkComponent
                            as={Button}
                            maxWidth="250px"
                            variant="iareSolid"
                            href="https://iare-strapi-backend.s3.eu-north-1.amazonaws.com/iare_logos_d809240509.zip"
                            leftIcon={<HiOutlineDownload />}
                        >
                            {t("download")}
                        </LinkComponent>

                        <Spacer />
                    </Flex>
                    <Spacer />
                    <Wrap
                        shouldWrapChildren
                        align="center"
                        direction="column"
                        spacing={16}
                    >
                        <NextImage
                            src="/brand/logo-website.svg"
                            width="250px"
                            height="250px"
                            layout="intrinsic"
                            w="full"
                            h="150px"
                        />
                        <NextImage
                            src="/brand/logo-social.svg"
                            width="250px"
                            height="250px"
                            layout="intrinsic"
                            w="full"
                            h="150px"
                        />
                        <NextImage
                            src="/brand/logo-plain-white.svg"
                            width="250px"
                            height="250px"
                            layout="intrinsic"
                            w="full"
                            h="150px"
                        />
                    </Wrap>
                </Flex>
            </Section>
            <Section title="Color" bg="white">
                <Flex w="full" h="full" direction="column">
                    <Wrap
                        shouldWrapChildren
                        justify="flex-start"
                        spacing={16}
                        w="full"
                        h="full"
                        pb={12}
                    >
                        <Color name="Nästan svart" hex="#13242A" size={64} />
                        <Color name="Mörkgrön" hex="#143523" size={64} />
                        <Color name="Porterbrun" hex="#7D5A3C" size={64} />
                        <Color name="Mörkblå" hex="#3C5F7D" size={64} />
                        <Color name="Vit" hex="#fff" size={64} />
                    </Wrap>
                    <Text fontSize="lg">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Magni adipisci provident sunt numquam voluptatem nulla
                        atque perspiciatis quo voluptatibus? Corporis nobis
                        cumque iusto eum, hic velit perspiciatis minus itaque
                        molestias.
                    </Text>
                </Flex>
            </Section>
            <Section title="Typography" bg="white">
                <VStack spacing={2}>
                    <Typography
                        description="Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Magni adipisci provident sunt numquam voluptatem nulla
                atque perspiciatis quo voluptatibus? Corporis nobis
                cumque iusto eum, hic velit perspiciatis minus itaque
                molestias."
                        _for="Heading"
                        family="oxygen"
                        types={[
                            { name: "Regular", weight: 300 },
                            { name: "Medium", weight: 400 },
                            { name: "Bold", weight: 700 },
                        ]}
                    />
                    <Typography
                        description="Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Magni adipisci provident sunt numquam voluptatem nulla
                atque perspiciatis quo voluptatibus? Corporis nobis
                cumque iusto eum, hic velit perspiciatis minus itaque
                molestias."
                        _for="paragraph"
                        family="source sans pro"
                        types={[
                            { name: "Thin", weight: 200 },
                            { name: "Regular", weight: 300 },
                            { name: "Medium", weight: 400 },
                            { name: "Semi bold", weight: 600 },
                        ]}
                    />
                    <Typography
                        description="Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Magni adipisci provident sunt numquam voluptatem nulla
                atque perspiciatis quo voluptatibus? Corporis nobis
                cumque iusto eum, hic velit perspiciatis minus itaque
                molestias."
                        _for="documents"
                        family="helvetica"
                        types={[
                            { name: "Thin", weight: 200 },
                            { name: "Regular", weight: 300 },
                            { name: "Medium", weight: 400 },
                            { name: "Bold", weight: 700 },
                        ]}
                    />
                </VStack>
            </Section>
        </VStack>
    );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
    return {
        props: {
            ...(await fetchHydration()),
        },
        revalidate: 60,
    };
};

export default View;
