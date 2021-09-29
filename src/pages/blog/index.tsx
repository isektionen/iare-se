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
    Stack,
    Grid,
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
    useDisclosure,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverContent,
    Wrap,
    PopoverTrigger,
    GridProps,
} from "@chakra-ui/react";
import strapi, { gql } from "lib/strapi";
import { GetStaticProps } from "next";
import useTranslation from "next-translate/useTranslation";
import React, { useCallback, useEffect, useMemo, useState } from "react";
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
import { estimateReadingMinutes, getReadingTime, lorem } from "utils/text";
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
import { usePagination } from "hooks/use-pagination";
import { useRouter } from "next/router";
import { useQuery } from "hooks/use-nets";
import blog from "models/blog";

export type Feed = ((Omit<Post, "categories"> | Event | Jobs) & {
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
    href: string;
    imgurl: string;
    readingTime: number | string;
    description: string;
    author: string;
}

const ItemDescription = ({
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

interface IItem extends GridItemProps {
    item: ItemProps;
}

const Item = ({
    item: {
        categories,
        title,
        href,
        imgurl,
        description: _description,
        readingTime,
        author: _author,
    },
    mx,
    mb,
    bottom,
    ...props
}: IItem) => {
    const { t } = useTranslation("common");

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
                                <Icon as={AiOutlineClockCircle} mr={1} />
                                <Text size="sm">
                                    {t("readingTime", { count: readingTime })}
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
    const { isOpen, onOpen, onClose } = useDisclosure();
    if (isMobile) {
        return (
            <React.Fragment>
                <Button
                    rightIcon={<IoIosArrowDown />}
                    size="sm"
                    variant="ghost"
                    onClick={onOpen}
                >
                    {current.label}
                </Button>
                <Drawer isOpen={isOpen} placement="bottom" onClose={onClose}>
                    <DrawerOverlay />
                    <DrawerContent>
                        <DrawerBody>
                            <WrapPadding>
                                <VStack spacing={2} align="flex-start">
                                    {options.map((item) => (
                                        <Button
                                            key={item.key}
                                            variant="ghost"
                                            fontWeight={
                                                item.label === current.label
                                                    ? "bold"
                                                    : "normal"
                                            }
                                            onClick={() => {
                                                setOption(item);
                                                onClose();
                                            }}
                                        >
                                            {item.label}
                                        </Button>
                                    ))}
                                </VStack>
                            </WrapPadding>
                        </DrawerBody>
                    </DrawerContent>
                </Drawer>
            </React.Fragment>
        );
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

interface IView extends GridProps {
    feed: Feed;
    span?: number;
}

const CalendarView = ({ feed }: IView) => {
    const { t } = useTranslation("feed");
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
        <Box px={{ base: 6, md: 12 }} w="full">
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
                        {t("calendar.today")}
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
                                                    size={4}
                                                    color="white"
                                                    bg="gray.900"
                                                    fontSize="xs"
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
                                    color={
                                        day.isToday
                                            ? "white"
                                            : day.isSameMonth
                                            ? "black"
                                            : "gray.500"
                                    }
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

export const GalleryView = ({
    feed,
    py,
    templateRows: tr,
    templateColumns: tc,
    span,
    ...props
}: IView) => {
    const isAboveMd = useBreakpointValue({ base: false, md: true });
    const { t } = useTranslation("feed");
    const {
        slicer,
        pages,
        goBackward,
        goForward,
        onCountChange,
        isDelimiterOpen,
        isVisible,
        delimiterPages,
    } = usePagination({
        count: feed.length - 3,
        itemsPerPage: 6,
        offset: 3,
    });

    const [start, end, pageIndex] = slicer;

    useEffect(() => {
        onCountChange(feed.length - 3);
    }, [feed.length, onCountChange]);
    return (
        <React.Fragment>
            <Grid
                px={{ base: 6, md: 12 }}
                templateColumns={
                    tc
                        ? tc
                        : {
                              base: "repeat(1, 1fr)",
                              md: "repeat(12, 1fr)",
                          }
                }
                templateRows={
                    tr ? tr : { base: "repeat(6, 1fr)", md: "repeat(3, 1fr)" }
                }
                gap={6}
                w="full"
                py={py}
            >
                {feed.length === 0 && (
                    <GridItem colSpan={12}>
                        <Center w="full" minH="33vh">
                            <Heading size="lg">{t("gallery.empty")}</Heading>
                        </Center>
                    </GridItem>
                )}
                {feed.length > 0 &&
                    !span &&
                    feed.slice(0, 2).map((item) => (
                        <Item
                            key={item.id}
                            colSpan={span ? span : 6}
                            mx={4}
                            mb="90px"
                            bottom="-90px"
                            item={{
                                categories: item.categories,
                                href: item?.__href ?? "#",
                                imgurl: item?.banner?.url ?? "/news-image.png",
                                readingTime: getReadingTime(item.__body),
                                title: item.title,
                                description: item.description as string,
                                author: item.author,
                            }}
                        />
                    ))}
                {feed.length > 0 &&
                    feed
                        .slice(span ? 0 : start + 2, span ? undefined : end + 2)
                        .map((item, idx) => (
                            <Item
                                key={item.id + "-" + pageIndex + "-" + idx}
                                colSpan={span ? span : { base: 6, md: 4 }}
                                mx={{ base: 4, md: 0 }}
                                mb={{ base: "90px", md: "40px" }}
                                bottom={{ base: "-90px", md: "-140px" }}
                                item={{
                                    href: item?.__href ?? "#",
                                    imgurl:
                                        item?.banner?.url ?? "/news-image.png",
                                    categories: item.categories,
                                    readingTime: getReadingTime(item.__body),
                                    title: item.title,
                                    description: item.description as string,
                                    author: item.author,
                                }}
                            />
                        ))}
            </Grid>
            <Flex px={{ base: 6, md: 12 }}>
                <Spacer />
                {isVisible && (
                    <HStack spacing={0} borderWidth="1px" borderRadius="md">
                        <Button
                            leftIcon={<IoChevronBack />}
                            onClick={goBackward}
                            size="sm"
                            variant="ghost"
                            rounded="none"
                        >
                            {isAboveMd && t("pagination.previous")}
                        </Button>
                        {pages.map((item, idx) => {
                            if (item.type === "page") {
                                return (
                                    <Button
                                        rounded="none"
                                        key={idx + "page-" + item.index}
                                        fontWeight={
                                            item.isCurrent ? "bold" : "normal"
                                        }
                                        bg={
                                            item.isCurrent ? "gray.50" : "white"
                                        }
                                        onClick={item.onClick}
                                        size="sm"
                                        variant="ghost"
                                    >
                                        {item.label}
                                    </Button>
                                );
                            }
                            return (
                                <Popover
                                    isOpen={isDelimiterOpen}
                                    key={idx + "page-" + item.index}
                                    closeOnBlur
                                    closeOnEsc
                                    returnFocusOnClose={false}
                                    matchWidth={false}
                                    placement="top"
                                    gutter={12}
                                >
                                    <PopoverTrigger>
                                        <Button
                                            rounded="none"
                                            size="sm"
                                            variant="ghost"
                                            key={"page-" + item.index}
                                            onClick={item.onClick}
                                        >
                                            {item.label}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent w="120px">
                                        <PopoverArrow />
                                        <PopoverBody>
                                            <Wrap shouldWrapChildren>
                                                {delimiterPages?.map(
                                                    (item, idx) => (
                                                        <Button
                                                            variant="ghost"
                                                            size="xs"
                                                            key={
                                                                "delimiterPage" +
                                                                idx
                                                            }
                                                            onClick={
                                                                item.onClick
                                                            }
                                                        >
                                                            {item.index}
                                                        </Button>
                                                    )
                                                )}
                                            </Wrap>
                                        </PopoverBody>
                                    </PopoverContent>
                                </Popover>
                            );
                        })}
                        <Button
                            rightIcon={<IoChevronForward />}
                            onClick={goForward}
                            size="sm"
                            variant="ghost"
                            rounded="none"
                        >
                            {isAboveMd && t("pagination.next")}
                        </Button>
                    </HStack>
                )}
            </Flex>
        </React.Fragment>
    );
};

interface Option {
    label: string;
    value: string;
    isSelected?: boolean;
}

const FeedView = ({ header, footer, feed, categories }: LayoutProps<Props>) => {
    useHydrater({ header, footer });
    const { t, lang } = useTranslation("feed");

    const views = useMemo(
        () => [
            { label: t("view.gallery"), key: "GALLERY" },
            { label: t("view.calendar"), key: "CALENDAR" },
        ],
        [lang]
    );

    const router = useRouter();
    const query = useQuery(router);

    const types = useMemo(() => {
        const _type = query["type[]"] as string | undefined;
        if (_type) {
            return _type.includes(",")
                ? _type.split(",").map((item: string) => item.toLowerCase())
                : _type.toLowerCase();
        }
        return ["event", "job", "post"];
    }, [query]);

    const preselectedOptions = useCallback(
        (option: Option) => {
            if (types.includes(option.value.toLowerCase())) {
                return { ...option, isSelected: true };
            }
            return { ...option, isSelected: false };
        },
        [types]
    );

    const [options, _setOptions] = useState<SelectOption[]>(
        [
            { label: t("article.event"), value: "Event" },
            { label: t("article.job"), value: "Job" },
            { label: t("article.news"), value: "Post" },
        ].map(preselectedOptions)
    );

    const setOptions = useCallback(
        (options: SelectOption[]) => {
            const _options = options
                .filter((item) => item.isSelected)
                .map((item) => item.value.toLowerCase())
                .join(",");
            if (_options && options.length > 0) {
                router.replace(`/blog?type[]=${_options}`);
            } else {
                router.replace("/blog");
            }
            _setOptions(options);
        },
        [router]
    );

    const filters = useMemo(
        () =>
            options.filter((item) => item.isSelected).map((item) => item.value),
        [options]
    );

    const [currentView, setCurrentView] = useState(views[0]);

    const firstItem = _.first(feed);
    const rest = useMemo(
        () =>
            [...feed.slice(1)].filter((item) =>
                filters.includes(item.__typename as string)
            ),
        [feed, filters]
    );

    useEffect(() => {
        const view = views.find((item) => item.key === currentView.key);
        if (view) {
            setCurrentView(view);
        }
    }, [lang]);

    return (
        <VStack spacing={4}>
            <Flex w="full" h="35vh" position="relative" mb="140px">
                <Box
                    zIndex={1}
                    w={{ base: "full", md: "75%" }}
                    position="absolute"
                    bottom="-120px"
                    px={{ base: 6, md: 12 }}
                >
                    <Box bg="gray.50" h="200px" p={6}>
                        <ItemDescription
                            categories={firstItem?.categories ?? []}
                            title={firstItem?.title ?? ""}
                            readingTime={getReadingTime(
                                firstItem?.__body ?? ""
                            )}
                            href={firstItem?.__href ?? "#"}
                            imgurl={firstItem?.banner?.url ?? "/news-image.png"}
                            description={firstItem?.description ?? ""}
                            author={firstItem?.author ?? ""}
                        />
                    </Box>
                </Box>
                <LinkComponent as={Box} href={firstItem?.__href ?? "#"}>
                    <NextImage
                        src={firstItem?.banner?.url ?? "/news-image.png"}
                        width="2048px"
                        height="1365px"
                        h="35vh"
                        w="full"
                        layout="intrinsic"
                        objectFit="cover"
                        priority
                    />
                </LinkComponent>
            </Flex>
            <Box px={{ base: 6, md: 12 }} pt={4} w="full">
                <Stack
                    borderBottomColor="gray.200"
                    borderBottomWidth="1px"
                    pb={0.5}
                    justify={{ base: "space-between", md: "flex-start" }}
                    direction={{ base: "row", md: "row" }}
                >
                    <ViewMenu
                        current={currentView}
                        options={views}
                        setOption={setCurrentView}
                    />
                    <SelectMenu
                        label="article"
                        options={options}
                        variant="ghost"
                        setOptions={setOptions}
                    />
                </Stack>
            </Box>
            <Box w="full">
                {currentView?.key === "GALLERY" && <GalleryView feed={rest} />}
                {currentView?.key === "CALENDAR" && (
                    <CalendarView feed={rest} />
                )}
            </Box>
        </VStack>
    );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    const { feed, error } = await blog.getFeed(locale);
    const { categories } = await blog.getCategories(locale, feed);

    return {
        props: {
            feed,
            categories,
            error,
            ...(await fetchHydration()),
        },
        revalidate: 20,
    };
};

export default FeedView;
