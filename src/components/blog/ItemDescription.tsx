import {
    Badge,
    Flex,
    Heading,
    HStack,
    Icon,
    Stack,
    Text,
} from "@chakra-ui/react";
import { LinkComponent } from "components/LinkComponent";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import { AiOutlineClockCircle } from "react-icons/ai";

interface ItemProps {
    categories: string[];
    title: string;
    href: string;
    imgurl: string;
    readingTime: number | string;
    description: string;
    author: string;
}

export const ItemDescription = ({
    categories,
    title,
    href,
    readingTime,
    description,
    author,
}: ItemProps) => {
    const { t } = useTranslation("common");

    return (
        <React.Fragment>
            <HStack spacing={1}>
                {categories.map((item) => (
                    <Badge colorScheme="dark" key={item}>
                        {item}
                    </Badge>
                ))}
            </HStack>
            <Stack
                pt={2}
                direction={{ base: "column", md: "row" }}
                spacing={12}
                align="baseline"
            >
                <Flex direction="column" h="calc(100% - 25px)">
                    <LinkComponent as={Heading} href={href} size="lg">
                        {title}
                    </LinkComponent>
                    <Text fontSize="sm" color="gray.600">
                        {description}
                    </Text>
                </Flex>
                <HStack
                    spacing={2}
                    align="stretch"
                    fontSize="sm"
                    color="gray.600"
                >
                    <Flex align="center">
                        <Icon as={AiOutlineClockCircle} mr={1} />
                        <Text size="sm">
                            {t("readingTime", { count: readingTime })}
                        </Text>
                    </Flex>
                    <Text size="sm">{author}</Text>
                </HStack>
            </Stack>
        </React.Fragment>
    );
};
