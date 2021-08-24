import {
    Box,
    Button,
    Flex,
    Heading,
    SimpleGrid,
    Spacer,
    Stack,
    VStack,
    Wrap,
    Text,
    Icon,
    Center,
    Circle,
    Tag,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    useDisclosure,
    Input,
    InputGroup,
    InputLeftElement,
    HStack,
    ButtonProps,
    ButtonGroup,
    Avatar,
    Tooltip,
} from "@chakra-ui/react";
import AccessibleLink from "components/AccessibleLink";
import { LinkComponent } from "components/LinkComponent";
import { NextImage } from "components/NextImage";
import { GetStaticPaths, GetStaticProps } from "next";
import useTranslation from "next-translate/useTranslation";
import React, { useState } from "react";
import { fetchHydration, useHydrater } from "state/layout";
import { LayoutProps } from "types/global";
import {
    IoIosArrowDown,
    IoIosArrowForward,
    IoIosArrowRoundForward,
    IoIosSearch,
} from "react-icons/io";
import { isMobile } from "react-device-detect";

const ContactMenu = (props: ButtonProps) => {
    const { onToggle, ...controls } = useDisclosure();
    return (
        <Menu {...controls}>
            <MenuButton
                textAlign="left"
                as={Button}
                variant="outline"
                rightIcon={<IoIosArrowDown />}
                {...props}
            >
                Styrelsen
            </MenuButton>
            <MenuList>
                <MenuItem>item</MenuItem>
            </MenuList>
        </Menu>
    );
};

const ContactSearch = () => {
    return (
        <InputGroup>
            <InputLeftElement pointerEvents="none">
                <Icon as={IoIosSearch} />
            </InputLeftElement>

            <Input type="search" variant="outline" placeholder="Search..." />
        </InputGroup>
    );
};
const ContactSelector = () => {
    const { t } = useTranslation("contact");
    return (
        <Box
            w={{ base: "full", lg: "3xl" }}
            minW={{ base: "full", lg: "28rem" }}
            p={6}
            bg="white"
            shadow="2xl"
            rounded="md"
            borderWidth="1px"
            borderColor="gray.200"
        >
            <VStack spacing={4} align="stretch">
                <Heading size="lg">{t("recipent")}</Heading>
                <Stack
                    direction={{ base: "column-reverse", sm: "row" }}
                    spacing={4}
                >
                    <ContactMenu w={{ base: "full", sm: 72 }} />
                    <ContactSearch />
                </Stack>
                <Box
                    h="md"
                    overflowY="scroll"
                    borderColor="gray.200"
                    borderWidth="1px"
                    rounded="lg"
                >
                    <VStack
                        spacing={0}
                        overflow="hidden"
                        align="stretch"
                        pb={1}
                    >
                        <StackItem />
                        <StackItem />
                        <StackItem />
                        <StackItem />
                        <StackItem />
                        <StackItem />
                        <StackItem />
                        <StackItem />
                        <StackItem />
                        <StackItem />
                        <StackItem />
                        <StackItem />
                        <StackItem />
                        <StackItem />
                    </VStack>
                </Box>
            </VStack>
        </Box>
    );
};

const StackItem = () => {
    const { t } = useTranslation("contact");
    return (
        <HStack
            borderTopWidth="0"
            borderLeftWidth="0"
            borderRightWidth="0"
            borderBottomWidth="1px"
            h="60px"
            px={6}
            py={2}
            spacing={4}
        >
            {!isMobile && (
                <Tooltip label="John Landeholt">
                    <Avatar
                        name="John Landeholt"
                        rounded="md"
                        size="sm"
                        mr={4}
                    />
                </Tooltip>
            )}
            <Stack direction={{ base: "column", sm: "row" }} spacing={4}>
                <Text fontWeight="600">John Landeholt</Text>
                {!isMobile && <Text fontWeight="thin">·</Text>}
                <Text color="gray.600">Webmaster</Text>
            </Stack>
            <Spacer />
            <Button variant="iareSolid" size="xs">
                {!isMobile && t("contact")}
                <Icon as={IoIosArrowForward} />
            </Button>
        </HStack>
    );
};

const GridItem = () => {
    const [isHover, setHover] = useState(false);
    return (
        <Flex
            position="relative"
            transition="box-shadow 0.2s ease-in"
            shadow={isHover ? "xl" : "md"}
            rounded="md"
            direction="column"
            bg="white"
            maxH="200px"
            overflow="hidden"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <Flex
                position="absolute"
                top="70%"
                p={2}
                h="30px"
                w="full"
                left="0"
                zIndex="1"
                justify="center"
            >
                <Tag
                    colorScheme="brand"
                    size="sm"
                    borderColor="brand.50"
                    borderWidth="1px"
                    fontWeight="medium"
                    rounded="full"
                    shadow="lg"
                >
                    Ordförande CMi
                </Tag>
            </Flex>
            <NextImage
                borderTopRadius="lg"
                overflow="hidden"
                transition="filter 0.2s ease-in"
                filter={isHover ? "brightness(115%)" : "brightness(100%)"}
                w="100%"
                h="80%"
                bg="green.200"
                layout="intrinsic"
                width={300 * 3}
                height={200 * 3}
                objectFit="cover"
                objectPosition="center"
                src="https://iare-strapi-backend.s3.eu-north-1.amazonaws.com/photo_1542156822_6924d1a71ace_4ec5bc5630.webp"
                priority
            />
            <Box p={2}>
                <AccessibleLink href="/">Item</AccessibleLink>
            </Box>
        </Flex>
    );
};

const ContactGrid = () => {
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
                <GridItem />
                <GridItem />
                <GridItem />
                <GridItem />
            </SimpleGrid>
            <Spacer />
            <LinkComponent as={Button} href="/" size="sm" variant="ghost">
                <Text>{t("browse")}</Text>
                <Icon as={IoIosArrowRoundForward} boxSize={6} />
            </LinkComponent>
        </VStack>
    );
};

const ContactView = ({ header, footer }: LayoutProps<{}>) => {
    useHydrater({ header, footer });

    return (
        <Stack
            w="full"
            justify="center"
            align="stretch"
            spacing={10}
            direction={{ base: "column", lg: "row" }}
            py={16}
            px={{ base: 3, md: 32 }}
        >
            <ContactSelector />
            <ContactGrid />
        </Stack>
    );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
    return {
        props: {
            ...(await fetchHydration()),
        },
    };
};

export default ContactView;
