import {
    Text,
    GridItemProps,
    useBreakpointValue,
    Heading,
    AspectRatio,
    Badge,
    Flex,
    GridItem,
    HStack,
    Icon,
    Spacer,
    VStack,
} from "@chakra-ui/react";
import { LinkComponent } from "components/LinkComponent";
import Box from "components/motion/Box";
import { NextImage } from "components/NextImage";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import { MdDateRange } from "react-icons/md";
import { getDate } from "utils/dates";


interface ItemProps {
    categories: string[];
    title: string;
    href: string;
    imgurl: string;
    calendarDate: string;
    description: string;
    author: string;
}

interface IItem extends GridItemProps {
    item: ItemProps;
}

export const Item = ({
    item: {
        categories,
        title,
        href,
        imgurl,
        description: _description,
        author: _author,
        calendarDate,
    },
    mx,
    mb,
    bottom,
    ...props
}: IItem) => {
    const { t, lang } = useTranslation("common");

    const author = _author.length > 12 ? _author.slice(0, 9) + "..." : _author;
    const length = useBreakpointValue({ base: 128, md: 64 }) as number;
    const description = _description
        ? _description.length > length
            ? _description.slice(0, length - 3) + "..."
            : _description
        : "N/A";
    return (
        <GridItem w="full" mb={mb} {...props}>
            <Box position="relative">
                <Box
                    mx={mx}
                    p={4}
                    position="absolute"
                    zIndex={2}
                    left="0"
                    bottom={bottom}
                    maxH="180px"
                    right="0"
                    bg="white"
                >
                    <HStack spacing={1} mb={2} minH={4}>
                        {categories.map((item) => (
                            <Badge colorScheme="dark" key={item}>
                                {item}
                            </Badge>
                        ))}
                    </HStack>
                    <VStack
                        spacing={1}
                        align="flex-start"
                        fontSize="sm"
                        h="80%"
                    >
                        <LinkComponent
                            as={Heading}
                            size="lg"
                            textTransform="capitalize"
                            noOfLines={1}
                            href={href}
                        >
                            {title}
                        </LinkComponent>

                        <Text fontSize="sm" color="gray.600">
                            {description}
                        </Text>
                        <Spacer />
                        <HStack spacing={2} fontSize="sm" color="gray.600">
                            <Flex align="center">
                                <Icon as={MdDateRange} mr={1} />
                                <Text size="sm">
                                    {getDate(calendarDate, "EEEE d MMM", lang)}
                                </Text>
                            </Flex>
                            <Text size="sm">{author}</Text>
                        </HStack>
                    </VStack>
                </Box>
                <LinkComponent as={Box} href={href}>
                    <AspectRatio ratio={3 / 2}>
                        <NextImage
                            src={imgurl}
                            width="2048px"
                            height="1365px"
                            h="full"
                            layout="intrinsic"
                            objectFit="cover"
                        />
                    </AspectRatio>
                </LinkComponent>
            </Box>
        </GridItem>
    );
};
