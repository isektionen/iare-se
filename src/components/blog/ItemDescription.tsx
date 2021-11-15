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
import { MdDateRange } from "react-icons/md";
import { getDate } from "utils/dates";

interface ItemProps {
    categories: string[];
    title: string;
    href: string;
    imgurl: string;
    description: string;
    author: string;
    calendarDate: string;
}

export const ItemDescription = ({
    categories,
    title,
    href,
    description,
    author,
    calendarDate,
}: ItemProps) => {
    const { t, lang } = useTranslation("common");

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
                        <Icon as={MdDateRange} mr={1} />
                        <Text size="sm">
                            {getDate(calendarDate, "EEEE d MMM", lang)}
                        </Text>
                    </Flex>
                    <Text size="sm">{author}</Text>
                </HStack>
            </Stack>
        </React.Fragment>
    );
};
