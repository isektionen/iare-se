import {
    VStack,
    Flex,
    Box,
    Heading,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from "@chakra-ui/react";
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
    const emails = [
        "event.naringsliv@iare.nu",
        "naringsliv@iare.nu",
        "naringsliv@dageni.se",
        "i-case@iare.nu",
        "istart@iare.nu",
        "naringsliv.mottagningen@iare.nu",
        "naringslivsansvarig@iare.nu",
    ];

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
                                {t("dageniTitle")}
                            </Heading>
                            <p>{t("dageniText1")}</p>
                            <p>{t("dageniText2")}</p>
                        </Box>
                        <Box pb="0.5em">
                            <Heading fontSize="1.5em" my="0.3em">
                                {t("iCaseTitle")}
                            </Heading>
                            <p>{t("iCaseText")}</p>
                        </Box>
                        <Box pb="0.5em">
                            <Heading fontSize="1.5em" my="0.3em">
                                {t("iStartTitle")}
                            </Heading>
                            <p>{t("iStartText")}</p>
                        </Box>
                        <TableContainer mt="2em">
                            <Table variant="simple">
                                <Thead>
                                    <Tr>
                                        <Th>{t("tableHeader1")}</Th>
                                        <Th>{t("tableHeader2")}</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {emails.map((email, index) => (
                                        <Tr key={index}>
                                            <Td>{t("tr" + (index + 1))}</Td>
                                            <Td>
                                                <Link
                                                    href={"mailto:" + email}
                                                    isExternal
                                                >
                                                    {email}
                                                </Link>
                                            </Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </Flex>
                </Box>
            </VStack>
        </React.Fragment>
    );
};

export default View;
