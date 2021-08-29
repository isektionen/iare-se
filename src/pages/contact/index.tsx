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
    Grid,
    GridItem,
    BoxProps,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverFooter,
    PopoverHeader,
    PopoverTrigger,
    Portal,
} from "@chakra-ui/react";
import AccessibleLink from "components/AccessibleLink";
import { LinkComponent } from "components/LinkComponent";
import { NextImage } from "components/NextImage";
import { GetStaticPaths, GetStaticProps } from "next";
import useTranslation from "next-translate/useTranslation";
import React, { useCallback, useEffect, useMemo, useState } from "react";
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
import {
    CommitteeFunction,
    CommitteeObjective,
    CommitteeObjectiveConnection,
    Representative as BaseRepresentative,
} from "types/strapi";
import _ from "underscore";
import Fuse from "fuse.js";

interface Representative extends BaseRepresentative {
    tags: string[];
}

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
            controls.onClose();
            setItems(
                items.map((_item) => ({
                    ..._item,
                    isSelected: _item.value === item.value,
                }))
            );
        },
        [controls, items, setItems]
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
                                <VStack spacing={2} align="flex-start">
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
                                </VStack>
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

interface IContactSearch {
    onSearch: (searchTerm: string) => void;
}

const ContactSearch = ({ onSearch }: IContactSearch) => {
    const { t } = useTranslation("contact");
    return (
        <InputGroup>
            <InputLeftElement pointerEvents="none">
                <Icon as={IoIosSearch} />
            </InputLeftElement>

            <Input
                type="search"
                variant="outline"
                placeholder={t("search.placeholder")}
                onChange={(e) => onSearch(e.target.value)}
            />
        </InputGroup>
    );
};

interface ContactProps {
    representatives: Record<string, Representative[]>;
    objectives: Option[];
}
const ContactSelector = ({ representatives, objectives }: ContactProps) => {
    const { t } = useTranslation("contact");

    const allLabel = t("selector.all");

    const [items, setSelected] = useState<Item[]>(
        objectives.map((obj) => {
            return {
                value: obj.label,
                isSelected: obj.label === t("selector.all"),
            };
        })
    );

    useEffect(() => {
        const _items = objectives.map((obj) => {
            return {
                value: obj.label,
                isSelected: obj.label === allLabel,
            };
        });
        setSelected(_items);
    }, [allLabel, objectives]);

    const selected = useMemo(
        () => items?.find((item) => item.isSelected),
        [items]
    );

    const [searchTerm, setSearchTerm] = useState<string>();
    const specificRepresentatives = useMemo(() => {
        if (searchTerm && searchTerm !== "") {
            const group = representatives[allLabel];
            const fuse = new Fuse(group, {
                keys: ["user.firstname", "user.lastname", "tags"],
                threshold: 0.3,
            });
            const result = fuse.search(searchTerm);
            return _.pluck(result, "item") || [];
        }
        if (
            selected &&
            representatives &&
            _.has(representatives, selected.value)
        ) {
            const group = representatives[
                selected.value
            ].flat() as Representative[];
            return group || [];
        }
        return [];
    }, [allLabel, representatives, searchTerm, selected]);

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

                    <ContactSearch onSearch={setSearchTerm} />
                </Stack>
                <Box
                    h="md"
                    overflowY="scroll"
                    borderColor="gray.200"
                    borderWidth="1px"
                    rounded="lg"
                >
                    <Grid
                        templateColumns={{
                            base: "25% 50% 25%",
                            md: "15% 60% 25%",
                        }}
                        templateRows={`repeat(${specificRepresentatives.length},1fr)`}
                    >
                        {specificRepresentatives.length > 0 &&
                            specificRepresentatives.map((rep, i) => (
                                <StackItem key={"specific-rep-" + i} {...rep} />
                            ))}
                    </Grid>
                </Box>
            </VStack>
        </Box>
    );
};

const capitalize = (text: string) =>
    text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();

interface IGridTableItem extends BoxProps {
    children: any | any[];
}
const GridTableItem = ({ children, ...props }: IGridTableItem) => {
    return (
        <GridItem
            colSpan={1}
            rowSpan={1}
            borderBottomWidth="1px"
            display="flex"
            alignItems="center"
            py={1}
            minH="60px"
            {...props}
        >
            {children}
        </GridItem>
    );
};

const StackItem = (representative: Representative) => {
    const { t } = useTranslation("contact");
    const isAboveMd = useBreakpointValue({ base: true, md: false });

    const roles = useMemo(() => {
        const role = _.pluck(
            representative.committee_roles as CommitteeFunction[],
            "role"
        ).map(capitalize);

        const abbreviation = _.pluck(
            representative.committee_roles as CommitteeFunction[],
            "abbreviation"
        ).map((text, i) => {
            if (!text) return role[i];
            return text?.toUpperCase();
        });

        const href = _.pluck(
            representative.committee_roles as CommitteeFunction[],
            "slug"
        ).map((text) => "/contact/" + text);

        return {
            role,
            abbreviation,
            href,
        };
    }, [representative.committee_roles]);

    const fullName = useMemo(
        () =>
            representative.user?.firstname +
            " " +
            representative.user?.lastname,
        [representative.user?.firstname, representative.user?.lastname]
    );

    const hasMultipleRoles = useMemo(
        () =>
            representative &&
            representative.committee_roles &&
            representative.committee_roles?.length > 1,
        [representative]
    );
    return (
        <>
            <GridTableItem pl={2}>
                <Tooltip label={fullName}>
                    <Avatar
                        name={fullName}
                        rounded="md"
                        size="md"
                        src={representative.cover?.formats.thumbnail}
                    />
                </Tooltip>
            </GridTableItem>
            <GridTableItem
                flexDirection="column"
                alignItems="flex-start"
                justifyContent="center"
            >
                <Text fontWeight="600">{fullName}</Text>
                <Tooltip label={roles.role.join(", ")}>
                    <Text color="gray.600">
                        {roles?.abbreviation.join(", ") ||
                            (roles?.role.join(", ") as string)}
                    </Text>
                </Tooltip>
            </GridTableItem>

            <GridTableItem pr={2}>
                <Spacer />
                {hasMultipleRoles ? (
                    <ContactButton
                        rep={fullName}
                        role={roles.role}
                        href={roles.href}
                    />
                ) : (
                    <LinkComponent
                        as={Button}
                        variant="iareSolid"
                        size="xs"
                        pr={2}
                        href={_.first(roles.href) as string}
                    >
                        {!isAboveMd && t("contact")}
                        <Icon as={IoIosArrowForward} />
                    </LinkComponent>
                )}
            </GridTableItem>
        </>
    );
};

interface Role {
    rep: string;
    role: string[];
    href: string[];
}

const ContactButton = ({ rep, role, href }: Role) => {
    const isAboveMd = useBreakpointValue({ base: true, md: false });

    const { isOpen, onOpen, onClose } = useDisclosure();

    const { t } = useTranslation("contact");
    if (isMobile) {
        return (
            <>
                <Button variant="iareSolid" size="xs" pr={2} onClick={onOpen}>
                    {!isAboveMd && t("contact")}
                    <Icon as={IoIosArrowForward} />
                </Button>
                <Drawer isOpen={isOpen} placement="bottom" onClose={onClose}>
                    <DrawerOverlay />
                    <DrawerContent>
                        <DrawerHeader>
                            {t("selector.for", { rep })}
                        </DrawerHeader>
                        <DrawerBody>
                            <WrapPadding>
                                <VStack spacing={2} align="flex-start">
                                    {_.zip(role, href).map(([role, href]) => (
                                        <LinkComponent
                                            as={Button}
                                            variant="ghost"
                                            key={href}
                                            href={href}
                                        >
                                            {role}
                                        </LinkComponent>
                                    ))}
                                </VStack>
                            </WrapPadding>
                        </DrawerBody>
                    </DrawerContent>
                </Drawer>
            </>
        );
    }
    return (
        <Popover trigger="hover" placement="right">
            <PopoverTrigger>
                <Button variant="iareSolid" size="xs" pr={2}>
                    {!isAboveMd && t("contact")}
                    <Icon as={IoIosArrowForward} />
                </Button>
            </PopoverTrigger>
            <PopoverContent w="min-content">
                <PopoverArrow />

                <PopoverBody>
                    <VStack spacing={2} justify="center">
                        {_.zip(role, href).map(([role, href]) => (
                            <LinkComponent
                                as={Button}
                                size="xs"
                                variant="ghost"
                                key={href}
                                href={href}
                            >
                                {role}
                            </LinkComponent>
                        ))}
                    </VStack>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    );
};

const CustomGridItem = (representative: Representative) => {
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

    const href = useMemo(() => {
        const rep = _.first(
            representative.committee_roles as CommitteeFunction[]
        );
        if (!rep) return;
        return "/contact/" + rep.slug;
    }, [representative.committee_roles]);
    return (
        <LinkComponent
            as={Flex}
            href={href || "/contact/"}
            transition="box-shadow 0.2s ease-in"
            shadow={isHover ? "xl" : "md"}
            rounded="md"
            flexDirection="column"
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
                            {item?.role && capitalize(item?.role)}
                        </Tag>
                    ))}
                </Flex>
                {fullName}
            </Box>
        </LinkComponent>
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

interface Option {
    label: string;
    value: string | number;
}
interface Props {
    objectives: string[] | Option[];
    representatives: Record<string, Representative[]>;
}

const ContactView = ({
    header,
    footer,
    objectives: baseObjectives,
    representatives: baseRepresentatives,
}: LayoutProps<Props>) => {
    useHydrater({ header, footer });
    const { t } = useTranslation("contact");
    const allLabel = t("selector.all");

    const objectives = useMemo(() => {
        const allLabel = t("selector.all");
        return [allLabel, ...baseObjectives].map((obj, i) => ({
            value: i,
            label: obj as string,
        }));
    }, [baseObjectives, t]);
    const representatives = useMemo(
        () =>
            _.chain(baseRepresentatives)
                .pairs()
                .reduce((acc, [k, v]) => {
                    if (k === "__all__") {
                        return { ...acc, [allLabel]: v };
                    }
                    return { ...acc, [k]: v };
                }, {})
                .value(),
        [allLabel, baseRepresentatives]
    );

    const featuredContacts = useMemo(() => {
        return _.chain(representatives)
            .values()
            .flatten()
            .filter((rep) =>
                rep.committee_roles.some(
                    (role: CommitteeFunction) => role.featured_role
                )
            )
            .value();
    }, [representatives]);

    return (
        <>
            <Stack
                w="full"
                justify="center"
                align="stretch"
                spacing={10}
                direction={{ base: "column", lg: "row" }}
                py={16}
                px={{ base: 3, md: 32 }}
            >
                <ContactSelector
                    objectives={objectives as Option[]}
                    representatives={representatives}
                />
                <ContactGrid representatives={featuredContacts} />
            </Stack>
        </>
    );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
    const { data } = await strapi.query<{
        representatives: Representative[];
    }>({
        query: gql`
            query {
                representatives(where: { hidden: false }) {
                    id
                    user {
                        firstname
                        lastname
                    }
                    cover {
                        url
                        formats
                    }
                    committee_roles {
                        id
                        contact
                        role
                        featured_role
                        slug
                        abbreviation
                        committee_objectives {
                            id
                            objective
                        }
                    }
                    committee_objectives {
                        id
                        objective
                    }
                }
            }
        `,
    });

    const objectives = _.chain(data.representatives)
        .pluck("committee_objectives")
        .flatten()
        .pluck("objective")
        .unique()
        .value() as string[];

    const generateTags = (roles: CommitteeFunction[]) =>
        _.chain(
            [
                ..._.pluck(roles, "role"),
                ..._.pluck(roles, "abbreviation"),
                ...(_.chain(roles)
                    .pluck("committee_objectives")
                    .flatten()
                    .map("objective")
                    .value() as string[]),
            ].map((text) => text?.toLowerCase())
        )
            .unique()
            .filter((o) => o)
            .value();

    /**
     * Group by objectives & filtering relevant objectives per representative
     * 
     * Conversion example:
     * 
     *  From: [
                {
                    user: {
                        firstname: 'porter',
                        lastname: 'brun',
                    },
                    committee_roles: [
                        {
                            committee_objectives: [
                                {
                                    objective: 'a'
                                },
                                {
                                    objective: 'b'
                                },
                            ],
                        }, ...
                    ]
                },
                ...
            ]
            
        To: {
            a: [
                {
                user: {
                    firstname: 'porter',
                    lastname: 'brun',
                },
                committee_roles: [
                    {
                        committee_objectives: [
                            {
                                objective: 'a'
                            }
                        ],
                    }
                ]

            },
            ...
            ],
            b: [
                {
                    user: {
                        firstname: 'porter',
                        lastname: 'brun',
                    },
                    committee_roles: [
                        {
                            committee_objectives: [
                                {
                                    objective: 'b'
                                }
                            ],
                        }
                    ]
        
                },
                ...
            ]
        }

    
     */

    const representatives = _.chain(objectives)
        .reduce((acc, obj) => {
            const it = data.representatives
                .filter((rep) => {
                    if (!rep) return false;
                    const roles = _.propertyOf(rep)("committee_roles");
                    if (!roles) return false;
                    return _.chain(roles)
                        .pluck("committee_objectives")
                        .flatten()
                        .pluck("objective")
                        .some((o) => o === obj)
                        .value();
                })
                .map((rep) => _.omit(rep, "committee_objectives"))
                .map((rep) => {
                    const roles = rep?.committee_roles?.map((role) => ({
                        ...role,
                        committee_objectives:
                            role?.committee_objectives?.filter(
                                (_obj) => _obj?.objective === obj
                            ),
                    })) as CommitteeFunction[];

                    return {
                        ...rep,
                        tags: generateTags(roles),
                        committee_roles: _.reject(
                            roles,
                            (_obj) => _obj?.committee_objectives?.length === 0
                        ),
                    };
                }) as Representative[];
            if (_.has(acc, obj)) {
                return { ...acc, [obj]: [...acc[obj], ...it] };
            }
            return { ...acc, [obj]: [...it] };
        }, {} as Record<string, Representative[]>)
        .extend({
            __all__: _.map(data.representatives, (rep) => {
                const roles = rep?.committee_roles as CommitteeFunction[];

                return {
                    ..._.omit(rep, "committee_objectives"),
                    tags: generateTags(roles),
                };
            }),
        })
        .value();

    return {
        props: {
            objectives,
            representatives,
            ...(await fetchHydration()),
        },
    };
};

export default ContactView;
