import {
    Stack,
    Heading,
    Wrap,
    Avatar,
    VStack,
    Text,
    Box,
} from "@chakra-ui/react";
import { MDXLayout } from "components/mdx/Layout";
import { NextImage } from "components/NextImage";
import { useSanity } from "hooks/use-check-error";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { NextSeo } from "next-seo";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import { useHydrater } from "state/layout";
import { LayoutProps } from "types/global";
import { UploadFile, Committee } from "types/strapi";
import _ from "underscore";
import { makeTitle } from "utils/seo";

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
    const { t } = useTranslation();
    useSanity(error);
    useHydrater({ header, footer });
    return (
        <React.Fragment>
            <NextSeo title={makeTitle(title)} />
            <Box
                p={{ base: "0.5em", md: "2em" }}
                margin="0 auto"
                w={{ base: "100%", sm: "80%", md: "60%" }}
            >
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
        </React.Fragment>
    );
};

export default View;
