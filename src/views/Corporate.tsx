import { VStack, Flex, Box, Heading } from "@chakra-ui/react";
import { NextSeo } from "next-seo";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import { useHydrater } from "state/layout";
import { LayoutProps } from "types/global";
import { makeTitle } from "utils/seo";
import { Link } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

const View = ({ header, footer }: LayoutProps<{}>) => {
    useHydrater({ header, footer });

    const { t, lang } = useTranslation("corporate");

    return (
        <React.Fragment>
            <NextSeo title={makeTitle(t("seo:corporate.title"))} />

            <VStack
                h="full"
                w={{ base: "100%", sm: "80%", md: "60%" }}
                align="stretch"
                margin="10px auto"
                bg={{ base: "", sm: "rgb(240, 240, 240)" }}
                borderRadius={{ base: "0px", sm: "15px", md: "50px" }}
            >
                <Box p={{ base: "1em", md: "4em" }} bg="white.200">
                    <Flex
                        pb="2em"
                        justifyContent="space-between"
                        flexDirection="column"
                    >
                        <Box flex="1" textAlign="left" mb="1em">
                            <Heading verticalAlign="bottom">
                                {t("title")}
                            </Heading>
                        </Box>

                        <Box pb="0.5em">
                            <p>{t("explanation")}</p>
                        </Box>

                        <Box pb="0.5em">
                            <Heading fontSize="1.5em" my="0.3em">
                                {t("lunchtitle")}
                            </Heading>
                            <p>{t("lunchtext")}</p>
                        </Box>

                        <Box pb="0.5em">
                            <Heading fontSize="1.5em" my="0.3em">
                                {t("adtitle")}
                            </Heading>
                            <p>{t("adtext")}</p>
                        </Box>

                        <Box pb="0.5em">
                            <Heading fontSize="1.5em" my="0.3em">
                                {t("sponstitle")}
                            </Heading>
                            <p>{t("sponstext")}</p>
                        </Box>
                        <Box>
                            <Link
                                href="mailto:na@iare.nu"
                                isExternal
                                fontSize="1.5em"
                            >
                                {lang == "sv"
                                    ? "Maila Näringslivsansvarig"
                                    : "Email Coporate Relations Resonsible"}{" "}
                                <ExternalLinkIcon mx="2px" />
                            </Link>
                        </Box>
                    </Flex>
                </Box>
            </VStack>
        </React.Fragment>
    );
};

export default View;
