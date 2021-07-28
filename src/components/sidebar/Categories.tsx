import {
    Box,
    Flex,
    Heading,
    List,
    ListItem,
    ListProps,
    useBreakpointValue,
} from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import React from "react";

export interface Category {
    label: string;
    query?: () => void;
}

interface Props {
    items: Category[];
}

const CategoryItem = ({ query, label }: Category) => {
    const router = useRouter();
    // TODO: decouple logic
    const { t } = useTranslation("feed");
    const isActive =
        Object.values(router.query).includes(label.toLowerCase()) ||
        (Object.values(router.query).length === 0 &&
            label === t("sidebarAllCategories"));
    return (
        <Box
            as="span"
            rounded="base"
            w="full"
            cursor="pointer"
            bg={isActive ? "brand.200" : undefined}
            fontWeight={isActive ? "bold" : undefined}
            onClick={query}
            py={1}
            px={2}
            transitionProperty="margin-left"
            transitionDuration="0.5s"
            _hover={{
                marginLeft: 2,
            }}
        >
            {label}
        </Box>
    );
};

export const Categories = (props: ListProps & Props) => {
    const { items, ...rest } = props;
    const router = useRouter();
    const isMd = useBreakpointValue({ base: false, md: true });

    const { t } = useTranslation("feed");
    return (
        <Flex direction="column">
            {isMd && (
                <>
                    <Heading as="h4" size="md" fontWeight="semibold" mb={4}>
                        {t("sidebarCategoriesHeader")}
                    </Heading>
                    <Box w="160px">
                        <List spacing={2} styleType="none" {...rest}>
                            {items.map((item) => (
                                <ListItem key={item.label}>
                                    <CategoryItem {...item} />
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </>
            )}
        </Flex>
    );
};
