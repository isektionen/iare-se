import {
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
