import {
    Flex,
    Box,
    Stack,
    HStack,
    VStack,
    StackDivider,
    Heading,
    Text,
    Button,
    Icon,
    useBreakpointValue,
} from "@chakra-ui/react";
import AccessibleLink from "components/AccessibleLink";
import { LinkComponent } from "components/LinkComponent";
import { MDXLayout } from "components/mdx/Layout";
import { NextImage } from "components/NextImage";
import { useSanity } from "hooks/use-check-error";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { NextSeo } from "next-seo";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import { IoMdArrowDropleft } from "react-icons/io";
import { useHydrater } from "state/layout";
import { useSetLocaleSlug } from "state/locale";
import { LayoutProps } from "types/global";
import { Company, Jobs, UploadFile } from "types/strapi";
import { makeTitle } from "utils/seo";
interface Props {
    job: Jobs;
    mdx: MDXRemoteSerializeResult;
}

const View = ({
    header,
    footer,
    job,
    mdx,
    error,
    localeSlugs,
}: LayoutProps<Props>) => {
    const { t } = useTranslation("job");
    useSanity(error);
    useSetLocaleSlug(localeSlugs);
    useHydrater({ header, footer });

    const isAboveLg = useBreakpointValue({ base: false, lg: true });

    const company = job.company as Company;
    const image = job.banner as UploadFile;
    const cta = job?.contact?.find((item) => item?.type === "cta") || null;
    const contacts =
        job?.contact?.filter((item) => item?.type === "email") || [];
    const position = job?.position;
    const location = job?.location;
    return (
        <React.Fragment>
            <NextSeo
                title={makeTitle(t("seo:job.title", { job: job.title }), false)}
            />
            <Flex
                overflow="hidden"
                direction="column"
                bg="white"
                pos="relative"
            >
                {image && (
                    <Flex
                        maxH="55vh"
                        w="full"
                        pos="relative"
                        overflow="hidden"
                        _after={{
                            content: "''",
                            position: "absolute",
                            bottom: 0,
                            top: 0,
                            left: 0,
                            right: 0,
                        }}
                    >
                        <NextImage
                            w="full"
                            width={image.width as number}
                            height={image.height as number}
                            src={image.url as string}
                            layout="fill"
                            objectFit="cover"
                            objectPosition="center"
                            priority
                        />
                    </Flex>
                )}
                <Box px={{ base: 4, lg: 12 }} pt={{ base: 4, lg: 8 }}>
                    <AccessibleLink
                        href="/blog"
                        textDecoration="none"
                        _hover={{ textDecoration: "none" }}
                    >
                        <HStack>
                            <Icon as={IoMdArrowDropleft} />
                            <p>{t("common:back")}</p>
                        </HStack>
                    </AccessibleLink>
                </Box>
                <Box px={{ base: 4, lg: 12 }} pt={{ base: 4, lg: 8 }}>
                    {cta && (
                        <LinkComponent
                            href={cta.href || "#"}
                            as={Button}
                            variant="iareSolid"
                            w="full"
                            rounded="md"
                            p={6}
                            fontWeight="600"
                        >
                            {cta.label}
                        </LinkComponent>
                    )}
                </Box>
                <Stack
                    direction={{ base: "column", lg: "row" }}
                    spacing={{ base: 6, lg: 16 }}
                    px={{ base: 4, lg: 12 }}
                    pt={{ base: 4, lg: 8 }}
                    pb={{ base: 4, md: 16 }}
                >
                    {!isAboveLg && company && (
                        <HStack
                            bg="gray.100"
                            w="full"
                            rounded="md"
                            p={6}
                            fontWeight="600"
                            spacing={4}
                            justify="space-evenly"
                        >
                            <Text textTransform="capitalize">
                                {company.name}
                            </Text>
                            {position && (
                                <Flex
                                    justify="space-between"
                                    textTransform="capitalize"
                                >
                                    <Text>{position}</Text>
                                </Flex>
                            )}
                            {location && (
                                <Flex
                                    justify="space-between"
                                    textTransform="capitalize"
                                >
                                    <Text>{location}</Text>
                                </Flex>
                            )}
                        </HStack>
                    )}
                    {isAboveLg && company && (
                        <Box as="aside" w="250px" h="full">
                            <Box
                                bg="gray.100"
                                rounded="md"
                                fontWeight="600"
                                maxH="250px"
                                overflow="hidden"
                            >
                                <NextImage
                                    maxW="250px"
                                    src={company?.logo?.url || "/logo.svg"}
                                    width={company.logo?.width || 50}
                                    height={company.logo?.height || 50}
                                    layout="intrinsic"
                                    objectFit="contain"
                                />
                            </Box>
                            <VStack
                                mt={14}
                                spacing={8}
                                divider={
                                    <StackDivider borderColor="gray.200" />
                                }
                                align="stretch"
                            >
                                <Box>
                                    {position && (
                                        <Flex
                                            justify="space-between"
                                            textTransform="capitalize"
                                        >
                                            <Text fontWeight="bold">
                                                {t("position")}
                                            </Text>
                                            <Text>{position}</Text>
                                        </Flex>
                                    )}
                                    {location && (
                                        <Flex
                                            justify="space-between"
                                            textTransform="capitalize"
                                        >
                                            <Text fontWeight="bold">
                                                {t("location")}
                                            </Text>
                                            <Text>{location}</Text>
                                        </Flex>
                                    )}
                                </Box>
                                {contacts.length > 0 && (
                                    <Box>
                                        {contacts.map((item, i) => (
                                            <AccessibleLink
                                                textTransform="capitalize"
                                                key={(item?.href ?? "") + i}
                                                href={`mailto:${item?.href}`}
                                            >
                                                {item?.label}
                                            </AccessibleLink>
                                        ))}
                                    </Box>
                                )}
                            </VStack>
                        </Box>
                    )}

                    <Flex
                        overflow="hidden"
                        flexDirection="column"
                        flex={1}
                        p={4}
                        shadow="2xl"
                        rounded="md"
                        borderWidth="1px"
                        borderColor="gray.200"
                        minH="550px"
                        bg="white"
                        w="full"
                        pos="relative"
                    >
                        <Heading pb={8}>{job.title}</Heading>
                        {mdx && <MDXLayout source={mdx} />}
                    </Flex>
                </Stack>
            </Flex>
        </React.Fragment>
    );
};

export default View;
