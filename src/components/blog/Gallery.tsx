import {
    Box,
    Button,
    Center,
    Flex,
    Grid,
    GridItem,
    GridProps,
    Heading,
    HStack,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverContent,
    PopoverTrigger,
    Spacer,
    useBreakpointValue,
    VStack,
    Wrap,
} from "@chakra-ui/react";
import { usePagination } from "hooks/use-pagination";
import useTranslation from "next-translate/useTranslation";
import React, { useEffect } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { Post, Jobs, Event } from "types/strapi";
import { getReadingTime } from "utils/text";
import { Item } from "./Item";

type Feed = ((Omit<Post, "categories"> | Event | Jobs) & {
    author: string;
    __body: string;
    __calendarDate: string;
    __href: string;
    categories: string[];
})[];

interface IView extends GridProps {
    feed: Feed;
    span?: number;
}

export const Gallery = ({
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
        <VStack>
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
                        .slice(span ? start : start + 2, span ? end : end + 2)
                        .map((item, idx) => (
                            <Item
                                h={span ? "400px" : undefined}
                                key={item.id + "-" + pageIndex + "-" + idx}
                                colSpan={span ? span : { base: 6, md: 4 }}
                                mx={{ base: 4, md: 0 }}
                                mb={{ base: "90px", md: "40px" }}
                                bottom={
                                    span
                                        ? undefined
                                        : { base: "-90px", md: "-140px" }
                                }
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
            <Flex w="full" px={{ base: 6, md: 12 }}>
                <Spacer />
                {isVisible && (
                    <HStack spacing={0} borderWidth="1px" borderRadius="md">
                        <Button
                            _focus={{
                                borderWidth: 0,
                            }}
                            leftIcon={<IoChevronBack />}
                            onClick={goBackward}
                            size="sm"
                            variant="ghost"
                            rounded="none"
                        >
                            {isAboveMd && t("pagination.previous")}
                        </Button>
                        {pages
                            .filter((p) => !p.isHidden)
                            .map((page, key) => {
                                if (page.type === "delimiter") {
                                    return (
                                        <Popover
                                            isOpen={isDelimiterOpen}
                                            key={key + "page-" + page.index}
                                            closeOnBlur
                                            closeOnEsc
                                            returnFocusOnClose={false}
                                            matchWidth={false}
                                            placement="top"
                                            gutter={12}
                                        >
                                            <PopoverTrigger>
                                                <Button
                                                    _focus={{
                                                        borderWidth: 0,
                                                    }}
                                                    rounded="none"
                                                    size="sm"
                                                    variant="ghost"
                                                    key={"page-" + page.index}
                                                    onClick={page.onClick}
                                                >
                                                    ...
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent w="120px">
                                                <PopoverArrow />
                                                <PopoverBody>
                                                    <Wrap shouldWrapChildren>
                                                        {pages
                                                            .filter(
                                                                (p) =>
                                                                    p.isHidden
                                                            )
                                                            ?.map(
                                                                (page, idx) => (
                                                                    <Button
                                                                        variant="ghost"
                                                                        size="xs"
                                                                        key={
                                                                            "delimiterPage" +
                                                                            idx
                                                                        }
                                                                        onClick={
                                                                            page.onClick
                                                                        }
                                                                    >
                                                                        {
                                                                            page.index
                                                                        }
                                                                    </Button>
                                                                )
                                                            )}
                                                    </Wrap>
                                                </PopoverBody>
                                            </PopoverContent>
                                        </Popover>
                                    );
                                }
                                return (
                                    <Button
                                        _focus={{
                                            borderWidth: 0,
                                        }}
                                        rounded="none"
                                        key={key + "page-" + page.index}
                                        fontWeight={
                                            page.isCurrent ? "bold" : "normal"
                                        }
                                        bg={
                                            page.isCurrent ? "gray.50" : "white"
                                        }
                                        onClick={page.onClick}
                                        size="sm"
                                        variant="ghost"
                                    >
                                        {page.label}
                                    </Button>
                                );
                            })}
                        <Button
                            _focus={{
                                borderWidth: 0,
                            }}
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
        </VStack>
    );
};
