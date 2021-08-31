import React, { useState } from "react";
import {
    Box,
    BoxProps,
    Heading,
    StackProps,
    Text,
    VStack,
} from "@chakra-ui/react";
import { Link } from "react-scroll";
import _ from "underscore";
import useTranslation from "next-translate/useTranslation";
interface Props extends StackProps {
    mdxSource: string;
}
interface Item {
    heading: string;
}

const HeadingItem = ({ heading }: Item) => {
    const [isActive, setIsActive] = useState(false);

    return (
        <Link
            to={heading}
            spy={true}
            smooth={true}
            duration={500}
            offset={-160}
            onSetActive={() => setIsActive(true)}
            onSetInactive={() => setIsActive(false)}
        >
            <Text
                fontWeight={isActive ? 600 : 400}
                textTransform="capitalize"
                cursor="pointer"
                _hover={{
                    fontWeight: 600,
                }}
            >
                {heading}
            </Text>
        </Link>
    );
};

export const TableOfContent = ({ mdxSource, ...props }: Props) => {
    const { t } = useTranslation("mdx");
    const headingRegexp = /^#+ (.*$)/im;
    /**
     * [
     * {parent: h1,
     * children: [h2]},
     * ...
     * ]
     */
    const headings =
        mdxSource
            ?.split("\n")
            ?.filter((row) => headingRegexp.test(row))
            .map((row) => {
                if (/^# (.*$)/im.test(row)) {
                    return { parent: row.replace(/# /, ""), children: [] };
                }
                return row;
            }) ?? [];

    const tree = headings.reduce((acc, it, i) => {
        if (_.isObject(it)) {
            const children = [];
            for (let heading of headings.slice(i + 1)) {
                if (_.isObject(heading)) break;
                if (/^## (.*$)/im.test(heading)) {
                    children.push(heading.replace(/## /, ""));
                }
            }
            if (children.length > 0) {
                return [
                    ...acc,
                    { ...it, children: [...it.children, ...children] },
                ];
            }
            return [...acc, { ...it }];
        }
        return acc;
    }, [] as any[]) as { parent: string; children: string[] }[];

    if (headings.length === 0) {
        return <></>;
    }
    return (
        <VStack align="stretch" {...props}>
            <Heading
                size="xs"
                textTransform="uppercase"
                fontWeight="700"
                pb={4}
            >
                {t("on-this-page")}
            </Heading>
            {tree.map((item) => {
                return (
                    <Box key={item.parent}>
                        <HeadingItem heading={item.parent} />
                        {item.children.length > 0 && (
                            <VStack pl={6} align="stretch">
                                {item.children.map((child) => (
                                    <HeadingItem key={child} heading={child} />
                                ))}
                            </VStack>
                        )}
                    </Box>
                );
            })}
        </VStack>
    );
};
