import {
    HStack,
    Text,
    VStack,
    Flex,
    Box,
    Heading,
    Badge,
    Spacer,
    Icon,
    chakra,
    Stack,
    Grid,
    SimpleGrid,
    GridItem,
    GridItemProps,
    AspectRatio,
    Button,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Center,
    IconButton,
    Circle,
    useBreakpointValue,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerOverlay,
    Input,
    useDisclosure,
} from "@chakra-ui/react";
import strapi, { gql } from "lib/strapi";
import { GetStaticProps } from "next";
import useTranslation from "next-translate/useTranslation";
import React, { useCallback, useMemo, useState } from "react";
import {
    fetchHydration,
    getHeader,
    useHydrater,
    usePageMenu,
} from "state/layout";
import { DefHeader, LayoutProps } from "types/global";
import { Post, Category, Jobs, Event } from "types/strapi";

import _ from "underscore";
import { NextImage } from "components/NextImage";
import { AiOutlineClockCircle } from "react-icons/ai";
import { estimateReadingMinutes, getReadingTime } from "utils/text";
import { useTransform } from "framer-motion";
import { SelectMenu, SelectOption } from "components/document/SearchBar";
import { isMobile } from "react-device-detect";
import { IoIosArrowDown } from "react-icons/io";
import { Appointment, Calendar, useCalendar } from "state/calendar";
import { useDynamicLocale } from "hooks/use-format";
import { addHours, format } from "date-fns";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { LinkComponent } from "components/LinkComponent";
import { WrapPadding } from "components/browser/WrapPadding";

type Feed = ((Omit<Post, "categories"> | Event | Jobs) & {
    author: string;
    __body: string;
    __calendarDate: string;
    __href: string;
    categories: string[];
})[];

interface Props {
    feed: Feed;
    categories: Record<string, string[]>;
}

interface ItemProps {
    categories: string[];
    title: string;
    readingTime: number | string;
    description: string;
    author: string;
}

const ItemDescription = ({
    categories,
    title,
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
                h="calc(100% - 12px)"
                direction="row"
                spacing={12}
                align="baseline"
            >
                <Flex direction="column" h="full">
                    <Heading size="lg">{title}</Heading>
                    <Spacer />
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
                </Flex>
                <Text fontSize="sm" color="gray.600">
                    {description}
                </Text>
            </Stack>
        </React.Fragment>
    );
};

interface IItem extends GridItemProps {
    item: ItemProps;
}

const Item = ({
    item: { categories, title, description, readingTime, author },
    mx,
    mb,
    bottom,
    ...props
}: IItem) => {
    const { t } = useTranslation("common");
    return (
        <GridItem position="relative" w="full" {...props} mb={mb}>
            <Box
                mx={mx}
                p={4}
                position="absolute"
                zIndex={2}
                left="0"
                bottom={bottom}
                h="180px"
                right="0"
                bg="white"
            >
                <HStack spacing={1} mb={4} minH={4}>
                    {categories.map((item) => (
                        <Badge colorScheme="dark" key={item}>
                            {item}
                        </Badge>
                    ))}
                </HStack>
                <VStack spacing={1} align="flex-start" fontSize="sm" h="80%">
                    <Heading size="lg" textTransform="capitalize">
                        {title}
                    </Heading>
                    <Text fontSize="sm" color="gray.600">
                        {description}
                    </Text>
                    <Spacer />
                    <HStack spacing={2} fontSize="sm" color="gray.600">
                        <Flex align="center">
                            <Icon as={AiOutlineClockCircle} mr={1} />
                            <Text size="sm">
                                {t("readingTime", { count: readingTime })}
                            </Text>
                        </Flex>
                        <Text size="sm">{author}</Text>
                    </HStack>
                </VStack>
            </Box>
            <AspectRatio ratio={3 / 2}>
                <NextImage
                    src="https://iare-strapi-backend.s3.eu-north-1.amazonaws.com/51391457927_481d02c696_o_b982158ac6.jpg"
                    width="2048px"
                    height="1365px"
                    h="full"
                    layout="intrinsic"
                    objectFit="cover"
                />
            </AspectRatio>
        </GridItem>
    );
};

interface IViewMenu {
    current: {
        label: string;
        key: string;
    };
    options: {
        label: string;
        key: string;
    }[];
    setOption: (option: { label: string; key: string }) => void;
}

const ViewMenu = ({ current, options, setOption }: IViewMenu) => {
    if (isMobile) {
        return <React.Fragment></React.Fragment>;
    }
    return (
        <Menu>
            <MenuButton
                as={Button}
                rightIcon={<IoIosArrowDown />}
                size="sm"
                variant="ghost"
            >
                {current.label}
            </MenuButton>
            <MenuList>
                {options.map((item) => (
                    <MenuItem key={item.key} onClick={() => setOption(item)}>
                        {item.label}
                    </MenuItem>
                ))}
            </MenuList>
        </Menu>
    );
};

interface IView {
    feed: Feed;
}

const CalendarView = ({ feed }: IView) => {
    const locale = useDynamicLocale();
    const { labels, days, month, goBackward, goToday, goForward } = useCalendar(
        {
            weekStartWith: "monday",
            key: "blog",
            locale,
            appointments: feed.map((item) => ({
                label: item.title,
                href: item.__href,
                start: new Date(item.__calendarDate),
                end: addHours(new Date(item.__calendarDate), 1),
            })),
        }
    );
    const [selectedDay, setSelectedDay] = useState<number>(0);
    const isAboveMd = useBreakpointValue({ base: false, md: true });

    const { onClose, onOpen, isOpen } = useDisclosure();

    const handleOnOpen = useCallback(
        (appointments: Appointment[] | null, index: number) => {
            if (appointments && !isAboveMd) {
                setSelectedDay(index);
                onOpen();
            }
        },
        [isAboveMd, onOpen]
    );

    const selectedAppointments = useMemo(
        () => days[selectedDay].appointments,
        [days, selectedDay]
    );
    return (
        <Box px={{ base: 4, md: 12 }} w="full">
            <Flex w="full">
                <Text textTransform="capitalize" fontWeight="bold">
                    {month}
                </Text>
                <Spacer />
                <HStack>
                    <IconButton
                        size="sm"
                        variant="ghost"
                        aria-label="previous month"
                        icon={<IoChevronBack />}
                        onClick={goBackward}
                    />
                    <Button size="sm" variant="ghost" onClick={goToday}>
                        today
                    </Button>
                    <IconButton
                        size="sm"
                        variant="ghost"
                        aria-label="next month"
                        icon={<IoChevronForward />}
                        onClick={goForward}
                    />
                </HStack>
            </Flex>
            <Grid w="full" templateColumns="repeat(7, 1fr)">
                {labels.map((label) => (
                    <GridItem key={label} fontSize="md" h={6}>
                        <Center w="full">{label}</Center>
                    </GridItem>
                ))}
            </Grid>
            <Grid
                templateColumns="repeat(7, 1fr)"
                templateRows="repeat(6, 1fr)"
                w="full"
                fontSize={{ base: "sm", md: "xs" }}
                borderBottomWidth="1px"
                borderRightWidth="1px"
                overflow="hidden"
            >
                {days.map((day) => (
                    <GridItem
                        cursor={day.appointments ? "pointer" : "auto"}
                        onClick={() =>
                            handleOnOpen(day.appointments, day.index)
                        }
                        borderLeftWidth="1px"
                        borderTopWidth="1px"
                        key={"day-" + day.index}
                        bg={day.isWeekend ? "gray.50" : "white"}
                        p={0.5}
                        h={{ base: 20, md: 32 }}
                    >
                        <Flex
                            direction={{ base: "column-reverse", md: "row" }}
                            align={{ base: "center", md: "flex-start" }}
                            w="full"
                        >
                            {isAboveMd && day.appointments && (
                                <VStack align="stretch" w="full">
                                    {day.appointments
                                        .slice(0, 4)
                                        .map((appointment, i) => (
                                            <LinkComponent
                                                href={appointment.href}
                                                size="xs"
                                                variant="iareSolid"
                                                justifyContent="flex-start"
                                                w="full"
                                                as={Button}
                                                key={
                                                    "day-" + day.index + "-" + i
                                                }
                                            >
                                                {appointment.label.slice(
                                                    0,
                                                    Math.min(
                                                        appointment.label
                                                            .length,
                                                        15
                                                    )
                                                )}
                                            </LinkComponent>
                                        ))}
                                </VStack>
                            )}
                            {!isAboveMd && day.appointments && (
                                <HStack
                                    w="full"
                                    spacing="-1.5"
                                    align="center"
                                    justify="center"
                                    fontSize="sm"
                                    px={2}
                                    pt={2}
                                >
                                    {day.appointments
                                        .slice(0, 2)
                                        .map((appointment, i) => {
                                            const displayRest =
                                                (day?.appointments?.length ??
                                                    0) > 2 && i === 1;
                                            const rest = Math.max(
                                                (day?.appointments?.length ??
                                                    0) - 2,
                                                0
                                            );
                                            return (
                                                <Circle
                                                    key={
                                                        "day-" +
                                                        day.index +
                                                        "-" +
                                                        i
                                                    }
                                                    size={5}
                                                    color="white"
                                                    bg="gray.900"
                                                    borderColor="white"
                                                    borderWidth="0.5px"
                                                    zIndex={i + 1}
                                                >
                                                    {displayRest && `+${rest}`}
                                                </Circle>
                                            );
                                        })}
                                </HStack>
                            )}

                            <Spacer />

                            <Box p={1}>
                                <Circle
                                    size={{ base: 6, md: 5 }}
                                    color={day.isToday ? "white" : "black"}
                                    bg={day.isToday ? "brand.200" : undefined}
                                >
                                    {day.label}
                                </Circle>
                            </Box>
                        </Flex>
                    </GridItem>
                ))}
            </Grid>
            <Drawer isOpen={isOpen} placement="bottom" onClose={onClose}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerBody>
                        <WrapPadding>
                            <VStack align="flex-start">
                                {selectedAppointments?.map((appointment, i) => (
                                    <LinkComponent
                                        href={appointment.href}
                                        size="sm"
                                        variant="ghost"
                                        justifyContent="flex-start"
                                        w="full"
                                        as={Button}
                                        key={"day-" + selectedDay + "-" + i}
                                    >
                                        {appointment.label.slice(
                                            0,
                                            Math.min(
                                                appointment.label.length,
                                                30
                                            )
                                        )}
                                    </LinkComponent>
                                ))}
                            </VStack>
                        </WrapPadding>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </Box>
    );
};

const GalleryView = ({ feed }: IView) => {
    return (
        <Grid
            px={{ base: 4, md: 12 }}
            templateColumns="repeat(12, 1fr)"
            gap={6}
            w="full"
        >
            {feed.slice(0, 3).map((item) => (
                <Item
                    key={item.id}
                    colSpan={6}
                    mx={4}
                    mb="90px"
                    bottom="-90px"
                    item={{
                        categories: item.categories,
                        readingTime: getReadingTime(item.__body),
                        title: item.title,
                        description: item.description as string,
                        author: item.author,
                    }}
                />
            ))}
            {feed.slice(4, 7).map((item) => (
                <Item
                    key={item.id}
                    colSpan={4}
                    mb="40px"
                    bottom="-140px"
                    item={{
                        categories: item.categories,
                        readingTime: getReadingTime(item.__body),
                        title: item.title,
                        description: item.description as string,
                        author: item.author,
                    }}
                />
            ))}
        </Grid>
    );
};

const FeedView = ({ header, footer, feed, categories }: LayoutProps<Props>) => {
    useHydrater({ header, footer });
    usePageMenu({
        label: "",
        viewports: ["drawer"],
        items: [
            {
                label: "Händelser",
                href: "/",
            },
            {
                label: "Event",
                href: "/event",
            },
            {
                label: "Jobb",
                href: "/jobb",
            },
        ],
    });

    const views = useMemo(
        () => [
            { label: "Gallery view", key: "GALLERY" },
            { label: "Calendar view", key: "CALENDAR" },
        ],
        []
    );

    const [currentView, setCurrentView] = useState(views[1]);

    const { t, lang } = useTranslation("feed");

    const firstItem = _.first(feed);
    const rest = [
        ...feed.slice(1),
        ...feed.slice(1),
        ...feed.slice(1),
        ...feed.slice(1),
        ...feed.slice(1),
        ...feed.slice(1),
    ];

    return (
        <VStack spacing={4}>
            <Flex w="full" h="35vh" position="relative" mb="140px">
                <Box
                    zIndex={1}
                    w={{ base: "full", md: "50%" }}
                    position="absolute"
                    bottom="-120px"
                    px={4}
                >
                    <Box bg="gray.50" h="200px" p={6}>
                        <ItemDescription
                            categories={firstItem?.categories ?? []}
                            title={firstItem?.title ?? ""}
                            readingTime={getReadingTime(
                                firstItem?.__body ?? ""
                            )}
                            description={firstItem?.description ?? ""}
                            author={firstItem?.author ?? ""}
                        />
                    </Box>
                </Box>
                <NextImage
                    src="https://iare-strapi-backend.s3.eu-north-1.amazonaws.com/51391457927_481d02c696_o_b982158ac6.jpg"
                    width="2048px"
                    height="1365px"
                    h="35vh"
                    w="full"
                    layout="intrinsic"
                    objectFit="cover"
                    priority
                />
            </Flex>
            <Box px={{ base: 4, md: 12 }} pt={4} w="full">
                <HStack
                    borderBottomColor="gray.200"
                    borderBottomWidth="1px"
                    pb={0.5}
                >
                    <ViewMenu
                        current={currentView}
                        options={views}
                        setOption={setCurrentView}
                    />
                </HStack>
            </Box>
            {currentView?.key === "GALLERY" && <GalleryView feed={rest} />}
            {currentView?.key === "CALENDAR" && <CalendarView feed={rest} />}
        </VStack>
    );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
    const {
        data: { posts, events, jobs },
    } = await strapi.query<{
        posts: Post[];
        events: Event[];
        jobs: Jobs[];
    }>({
        query: gql`
            query {
                posts {
                    id
                    slug
                    banner {
                        url
                    }
                    description
                    committee {
                        name
                    }
                    title
                    published_at
                    body
                    categories {
                        name
                    }
                    published_at
                }
                events {
                    id
                    title
                    slug
                    category {
                        name
                    }
                    place {
                        name
                    }
                    committee {
                        name
                    }
                    startTime
                    deadline
                    description
                    banner {
                        url
                    }
                    published_at
                }
                jobs {
                    body
                    id
                    deadlineDate
                    slug
                    title
                    banner {
                        url
                    }
                    jobCategory {
                        name
                    }
                    company {
                        name
                    }
                    description
                    published_at
                }
            }
        `,
    });

    const getAuthor = (item: Event | Post | Jobs) => {
        switch (item.__typename) {
            case "Event":
                return item?.committee?.name;
            case "Post":
                return item?.committee?.name;
            case "Jobs":
                return item?.company?.name;
        }
    };

    const getHref = (item: Event | Post | Jobs) => {
        switch (item.__typename) {
            case "Event":
                return "/event/" + item.slug;
            case "Post":
                return "/blog/" + item.slug;
            case "Jobs":
                return "/job/" + item.slug;
        }
    };

    const getDateTime = (item: Event | Post | Jobs) => {
        switch (item.__typename) {
            case "Event":
                return item.startTime;
            case "Post":
                return item.published_at;
            case "Jobs":
                return item.deadlineDate;
        }
    };

    const getCategories = (item: Event | Post | Jobs) => {
        switch (item.__typename) {
            case "Event":
                return [item?.category?.name].filter((_item) => _item);
            case "Post":
                return item?.categories
                    ?.map((i) => i?.name)
                    .filter((_item) => _item);
            case "Jobs":
                return [item?.jobCategory?.name].filter((_item) => _item);
        }
    };

    const getBody = (item: Event | Post | Jobs) => {
        switch (item.__typename) {
            case "Event":
                return item?.description ?? "";
            case "Post":
                return item?.body ?? "";
            case "Jobs":
                return item?.body ?? "";
            default:
                return "";
        }
    };

    const feed = _.chain([...posts, ...jobs, ...events])
        .sortBy("published_at")
        .map((item) => ({
            ...item,
            id: item.__typename + "-" + item?.id,
            author: getAuthor(item),
            categories: getCategories(item),
            __body: getBody(item),
            __calendarDate: getDateTime(item),
            __href: getHref(item),
        }))
        .reverse()
        .value();

    const categories = _.chain(feed)
        .map((item) => ({
            type: item.__typename,
            value: _.pluck(item?.categories ?? [], "name"),
        }))
        .groupBy("type")
        .mapObject((item) =>
            _.pluck(item, "value")
                .flat()
                .filter((item) => item)
        )
        .value();

    return {
        props: {
            feed,
            categories,
            ...(await fetchHydration()),
        },
        revalidate: 20,
    };
};

export default FeedView;
