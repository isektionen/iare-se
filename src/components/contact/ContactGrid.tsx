import {
    VStack,
    Heading,
    Spacer,
    SimpleGrid,
    Icon,
    Text,
    Button,
} from "@chakra-ui/react";
import { LinkComponent } from "components/LinkComponent";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import { Representative } from "types/strapi";
import { CustomGridItem } from "./ContactGridItem";

interface Props {
    representatives: Representative[];
}

export const ContactGrid = ({ representatives }: Props) => {
    const { t } = useTranslation("contact");
    return (
        <VStack
            spacing={4}
            align="stretch"
            rounded="md"
            shadow="inner"
            borderWidth="1px"
            borderColor="gray.200"
            bg="gray.50"
            w={{ base: "full", lg: "3xl" }}
            minW={{ base: "full", lg: "28rem" }}
            p={6}
        >
            <Heading size="lg">{t("quickstart")}</Heading>
            <Spacer />
            <SimpleGrid
                rows={{ base: 4, lg: 2 }}
                columns={{ base: 1, lg: 2 }}
                spacing={4}
            >
                {representatives.slice(0, 3).map((rep) => (
                    <CustomGridItem key={rep.id} {...rep} />
                ))}
            </SimpleGrid>
            <Spacer />
            {
                <LinkComponent
                    as={Button}
                    isDisabled
                    href="/"
                    size="sm"
                    variant="ghost"
                >
                    <Text>{t("browse")}</Text>
                    <Icon as={IoIosArrowRoundForward} boxSize={6} />
                </LinkComponent>
            }
        </VStack>
    );
};
