import { Box, Flex, Stack, VStack } from "@chakra-ui/react";
import { SelectMenu, SelectOption } from "components/document/SearchBar";
import { LinkComponent } from "components/LinkComponent";
import { NextImage } from "components/NextImage";
import { useQuery } from "hooks/use-nets";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import React, { useMemo, useCallback, useState, useEffect } from "react";
import { useHydrater } from "state/layout";
import { LayoutProps } from "types/global";
import { Post, Jobs, Event } from "types/strapi";
import _ from "underscore";
import { getReadingTime } from "utils/text";

import { Calendar } from "components/blog/Calendar";
import { Gallery } from "components/blog/Gallery";
import { ItemDescription } from "components/blog/ItemDescription";
import { ViewMenu } from "components/blog/ViewMenu";
import { NextSeo } from "next-seo";
import { makeTitle } from "utils/seo";

interface Option {
    label: string;
    value: string;
    isSelected?: boolean;
}

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

const View = ({ header, footer, feed, categories }: LayoutProps<Props>) => {
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
        <React.Fragment>
            <NextSeo title={makeTitle(t("seo:blog.title"))} />
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
                                imgurl={
                                    firstItem?.banner?.url ?? "/news-image.png"
                                }
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
                    {currentView?.key === "GALLERY" && <Gallery feed={rest} />}
                    {currentView?.key === "CALENDAR" && (
                        <Calendar feed={rest} />
                    )}
                </Box>
            </VStack>
        </React.Fragment>
    );
};

export default View;
