import { VStack, Flex, Spacer, Wrap, Text, Button } from "@chakra-ui/react";
import { Color } from "components/brand/Color";
import { Section } from "components/brand/Section";
import { Typography } from "components/brand/Typography";
import { LinkComponent } from "components/LinkComponent";
import { NextImage } from "components/NextImage";
import { NextSeo } from "next-seo";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import { HiOutlineDownload } from "react-icons/hi";
import { useHydrater } from "state/layout";
import { LayoutProps } from "types/global";
import { makeTitle } from "utils/seo";

const View = ({ header, footer }: LayoutProps<{}>) => {
    useHydrater({ header, footer });

    const { t } = useTranslation("brand");
    return (
        <React.Fragment>
            <NextSeo title={makeTitle(t("seo:brand.title"))} />

            <VStack h="full" w="full" align="stretch">
                <Section title="Brand" bg="brand.200">
                    <Flex w="full" h="full">
                        <Flex w="50%" direction="column">
                            <Text fontSize="lg">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Magni adipisci provident sunt
                                numquam voluptatem nulla atque perspiciatis quo
                                voluptatibus? Corporis nobis cumque iusto eum,
                                hic velit perspiciatis minus itaque molestias.
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
                            <Color
                                name="Nästan svart"
                                hex="#13242A"
                                size={64}
                            />
                            <Color name="Mörkgrön" hex="#143523" size={64} />
                            <Color name="Porterbrun" hex="#7D5A3E" size={64} />
                            <Color name="Mörkblå" hex="#3C5F7D" size={64} />
                            <Color name="Vit" hex="#fff" size={64} />
                        </Wrap>
                        <Text fontSize="lg">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Magni adipisci provident sunt numquam
                            voluptatem nulla atque perspiciatis quo
                            voluptatibus? Corporis nobis cumque iusto eum, hic
                            velit perspiciatis minus itaque molestias.
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
        </React.Fragment>
    );
};

export default View;
