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
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    useBreakpointValue,
} from "@chakra-ui/react";
import AccessibleLink from "components/AccessibleLink";
import { LinkComponent } from "components/LinkComponent";
import { NextImage } from "components/NextImage";
import { GetStaticPaths, GetStaticProps } from "next";
import useTranslation from "next-translate/useTranslation";
import React, { useCallback, useMemo, useState } from "react";
import { fetchHydration, useHydrater } from "state/layout";
import { LayoutProps } from "types/global";
import {
    IoIosArrowDown,
    IoIosArrowForward,
    IoIosArrowRoundForward,
    IoIosSearch,
} from "react-icons/io";
import { isMobile } from "react-device-detect";
import { WrapPadding } from "components/browser/WrapPadding";
import strapi, { gql } from "lib/strapi";
import { CommitteeObjectiveConnection, Representative } from "types/strapi";
import _ from "underscore";

type Item = {
    value: string;
    isSelected: boolean;
};
interface IContactMenu extends ButtonProps {
    items: Item[];
    setItems: (items: Item[]) => void;
}

const ContactMenu = ({ items, setItems, ...props }: IContactMenu) => {
    const { onToggle, ...controls } = useDisclosure();

    const selected = items.find((item) => item.isSelected)?.value;

    const handleSelect = useCallback(
        (item: Item) => {
            setItems(
                items.map((_item) => ({
                    ..._item,
                    isSelected: _item.value === item.value,
                }))
            );
        },
        [items, setItems]
    );

    if (isMobile) {
        return (
            <>
                <Button variant="outline" onClick={controls.onOpen} {...props}>
                    <Flex w="full" align="center">
                        <Text textTransform="capitalize">{selected}</Text>
                        <Spacer />
                        <IoIosArrowDown />
                    </Flex>
                </Button>
                <Drawer
                    placement="bottom"
                    {...controls}
                    returnFocusOnClose={false}
                >
                    <DrawerOverlay />
                    <DrawerContent>
                        <DrawerHeader>Group</DrawerHeader>

                        <DrawerBody>
                            <WrapPadding>
                                {items.map((item) => (
                                    <Button
                                        textTransform="capitalize"
                                        key={item.value}
                                        variant="ghost"
                                        onClick={() => handleSelect(item)}
                                    >
                                        {item.value}
                                    </Button>
                                ))}
                            </WrapPadding>
                        </DrawerBody>
                    </DrawerContent>
                </Drawer>
            </>
        );
    }
    return (
        <Menu {...controls}>
            <MenuButton
                textAlign="left"
                as={Button}
                variant="outline"
                textTransform="capitalize"
                rightIcon={<IoIosArrowDown />}
                {...props}
            >
                {selected}
            </MenuButton>
            <MenuList>
                {items.map((item) => (
                    <MenuItem
                        textTransform="capitalize"
                        key={item.value}
                        onClick={() => handleSelect(item)}
                    >
                        {item.value}
                    </MenuItem>
                ))}
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
const ContactSelector = ({ representatives }: Props) => {
    const { t } = useTranslation("contact");

    const [items, setSelected] = useState<Item[]>(
        _.keys(representatives).map((rep, i) => ({
            value: rep,
            isSelected: i === 0,
        }))
    );

    const selected = useMemo(
        () => items.find((item) => item.isSelected),
        [items]
    );

    const specificRepresentatives = useMemo(() => {
        if (selected) {
            const group = representatives[
                selected.value
            ].flat() as Representative[];
            return group || [];
        }
        return [];
    }, [representatives, selected]);

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
                <Heading size="lg">{t("recipient")}</Heading>
                <Stack
                    direction={{ base: "column-reverse", sm: "row" }}
                    spacing={4}
                >
                    <ContactMenu
                        w={{ base: "full", sm: 60 }}
                        items={items}
                        setItems={setSelected}
                    />

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
                        {specificRepresentatives.length > 0 &&
                            specificRepresentatives.map((rep) => (
                                <StackItem key={rep.id} {...rep} />
                            ))}
                    </VStack>
                </Box>
            </VStack>
        </Box>
    );
};

const capitalize = (text: string) =>
    text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();

const StackItem = (representative: Representative) => {
    const { t } = useTranslation("contact");
    const isAboveMd = useBreakpointValue({ base: true, md: false });

    const roles = useMemo(
        () =>
            representative?.committee_roles
                ?.map((item) => {
                    return (
                        item?.abbreviation?.toUpperCase() ||
                        capitalize(item?.role ?? "")
                    );
                })
                .join(", ") ?? "",
        [representative.committee_roles]
    );
    const fullName = useMemo(
        () =>
            representative.user?.firstname +
            " " +
            representative.user?.lastname,
        [representative.user?.firstname, representative.user?.lastname]
    );

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
            <Tooltip label={fullName}>
                <Avatar
                    name={fullName}
                    rounded="md"
                    size="sm"
                    src={representative.cover?.formats.thumbnail}
                />
            </Tooltip>
            <Stack
                direction={{ base: "column", sm: "row" }}
                spacing={{ base: 1, sm: 4 }}
                align={{ base: "flex-start", sm: "center" }}
            >
                <Text fontWeight="600">{fullName}</Text>
                {!isAboveMd && <Text fontWeight="thin">·</Text>}
                <Text color="gray.600">{roles}</Text>
            </Stack>
            <Spacer />
            <Button variant="iareSolid" size="xs">
                {!isAboveMd && t("contact")}
                <Icon as={IoIosArrowForward} />
            </Button>
        </HStack>
    );
};

interface GridItemProps {
    representative: Representative;
}

const GridItem = (representative: Representative) => {
    const [isHover, setHover] = useState(false);

    const roles = useMemo(
        () => representative.committee_roles,
        [representative.committee_roles]
    );
    const fullName = useMemo(
        () =>
            representative.user?.firstname +
            " " +
            representative.user?.lastname,
        [representative.user?.firstname, representative.user?.lastname]
    );
    return (
        <Flex
            transition="box-shadow 0.2s ease-in"
            shadow={isHover ? "xl" : "md"}
            rounded="md"
            direction="column"
            bg="white"
            maxH="200px"
            overflow="hidden"
            onTouchStart={() => setHover(true)}
            onTouchEnd={() => setHover(false)}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <NextImage
                borderTopRadius="lg"
                overflow="hidden"
                transition="filter 0.2s ease-in"
                filter={isHover ? "brightness(115%)" : "brightness(100%)"}
                w="100%"
                h="80%"
                layout="intrinsic"
                width={300 * 3}
                height={200 * 3}
                objectFit="cover"
                objectPosition="center"
                src="https://iare-strapi-backend.s3.eu-north-1.amazonaws.com/photo_1542156822_6924d1a71ace_4ec5bc5630.webp"
                priority
            />
            <Box p={2} position="relative">
                <Flex
                    position="absolute"
                    top="-16px"
                    p={2}
                    h="30px"
                    w="full"
                    left="0"
                    zIndex="1"
                    justify="center"
                >
                    {roles?.map((item, key) => (
                        <Tag
                            key={item?.id ?? key}
                            colorScheme="brand"
                            size="sm"
                            fontWeight="medium"
                            rounded="full"
                            shadow="lg"
                        >
                            {item?.role}
                        </Tag>
                    ))}
                </Flex>
                <AccessibleLink href="/">{fullName}</AccessibleLink>
            </Box>
        </Flex>
    );
};

interface ContactGridProps {
    representatives: Representative[];
}

const ContactGrid = ({ representatives }: ContactGridProps) => {
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
                    <GridItem key={rep.id} {...rep} />
                ))}
            </SimpleGrid>
            <Spacer />
            <LinkComponent as={Button} href="/" size="sm" variant="ghost">
                <Text>{t("browse")}</Text>
                <Icon as={IoIosArrowRoundForward} boxSize={6} />
            </LinkComponent>
        </VStack>
    );
};

interface Props {
    representatives: Record<string, Representative[]>;
}

const ContactView = ({
    header,
    footer,
    representatives,
}: LayoutProps<Props>) => {
    useHydrater({ header, footer });

    const featuredContacts = useMemo(() => {
        const reps = _.chain(representatives)
            .values()
            .flatten()
            .value() as Representative[];
        return _.unique(
            reps.filter((rep) => rep.featured_contact),
            "id"
        );
    }, [representatives]);

    return (
        <>
            <pre>{JSON.stringify(representatives, null, 2)}</pre>
            <Stack
                w="full"
                justify="center"
                align="stretch"
                spacing={10}
                direction={{ base: "column", lg: "row" }}
                py={16}
                px={{ base: 3, md: 32 }}
            >
                <ContactSelector representatives={representatives} />
                <ContactGrid representatives={featuredContacts} />
            </Stack>
        </>
    );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
    const { data: _data } = await strapi.query<{
        representatives: Representative[];
    }>({
        query: gql`
            query {
                representatives(where: { hidden: false }) {
                    user {
                        firstname
                        lastname
                    }
                    cover {
                        formats
                        url
                    }
                    contact
                    featured_contact
                    committee_objectives {
                        objective
                        committee_roles {
                            role
                            abbreviation
                        }
                    }
                }
            }
        `,
    });

    const objectives = _.chain(_data.representatives)
        .pluck("committee_objectives")
        .flatten()
        .pluck("objective")
        .unique()
        .value();

    const representatives = objectives.reduce((acc, objective) => {
        const newItems = _data.representatives.filter((rep) =>
            rep.committee_objectives
                ?.map((o) => o?.objective)
                .includes(objective)
        );

        if (_.has(acc, objective)) {
            return { ...acc, [objective]: [...acc[objective], ...newItems] };
        }
        return { ...acc, [objective]: newItems };
    }, {});

    return {
        props: {
            representatives,
            ...(await fetchHydration()),
        },
    };
};

export default ContactView;
