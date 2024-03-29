import { VStack, Center, Flex, Spacer, Wrap, Text, Button, Link } from "@chakra-ui/react";
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
import { ExternalLinkIcon } from '@chakra-ui/icons'



const View = ({ header, footer }: LayoutProps<{}>) => {
    useHydrater({ header, footer });

    const { t, lang } = useTranslation("wellbeing");
    return (
        <React.Fragment>
            <NextSeo title={makeTitle(t("seo:safety-council.title"))} />

            <VStack h="full" w="full" align="stretch">
            <Center bg='lightgray' h='100px' color='white'>
                <Link href='https://forms.gle/5LNGeFGXRYrriYkP9' color="black" isExternal>
                    {lang == "sv" ? "Trygghetsrådets kontakt via Google Formulär" : "Safety Council contact  via Google Forms"} <ExternalLinkIcon mx='2px' />
                </Link>
            </Center>
            </VStack>
        </React.Fragment>
    );
};

export default View;