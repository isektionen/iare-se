import {
    VStack,
    Flex,
    Spacer,
    Wrap,
    Text,
    Button,
    Center,
    Square,
    Box,
    Heading,
    Image,
} from "@chakra-ui/react";
import { Color } from "components/brand/Color";
import { Section } from "components/brand/Section";
import { Typography } from "components/brand/Typography";
import Header from "components/layout/Header";
import { LinkComponent } from "components/LinkComponent";
import { NextImage } from "components/NextImage";
import { NextSeo } from "next-seo";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import { HiOutlineDownload } from "react-icons/hi";
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

            <VStack h="full" w="70%" align="stretch" margin="0 auto">
                <Box p={{ base: "1em", md: "4em" }} bg="white.200">
                    <Flex
                        pb="2em"
                        justifyContent="space-between"
                        flexDirection="column"
                    >
                        <Box flex="1" textAlign="left">
                            <Heading verticalAlign="bottom" mt="2em">
                                {t("title")}
                            </Heading>
                        </Box>

                        <Box pb="0.5em">
                            <p>{t("explanation")}</p>
                        </Box>

                        <Box pb="0.5em">
                            <Heading pb="0.2em">{t("lunchtitle")}</Heading>
                            <p>{t("lunchtext")}</p>
                        </Box>

                        <Box pb="0.5em">
                            <Heading pb="0.2em">{t("adtitle")}</Heading>
                            <p>{t("adtext")}</p>
                        </Box>

                        <Box pb="0.5em">
                            <Heading pb="0.2em">{t("sponstitle")}</Heading>
                            <p>{t("sponstext")}</p>
                        </Box>
                        <Box>
                            <Link href="mailto:na@iare.nu" isExternal>
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
