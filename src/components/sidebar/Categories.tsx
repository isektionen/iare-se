import {
    Box,
    Flex,
    Heading,
    List,
    ListItem,
    ListProps,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

export interface Category {
    label: string;
    query?: string;
}

interface Props {
    items: Category[];
}

const CategoryItem = ({ query, label }: Category) => {
    const { query: BaseQuery } = useRouter();
    const isActive = BaseQuery && query && BaseQuery[query];

    const handleQuery = () => {};
    return (
        <Box
            as="span"
            rounded="base"
            w="full"
            cursor="pointer"
            bg={isActive ? "brand.200" : undefined}
            onClick={handleQuery}
            pr={4}
            transitionProperty="padding-left"
            transitionDuration="0.5s"
            _hover={{
                paddingLeft: 2,
            }}
        >
            {label}
        </Box>
    );
};

export const Categories = (props: ListProps & Props) => {
    const { items, ...rest } = props;
    return (
        <Flex direction="column" {...rest}>
            <Heading as="h4" size="md" fontWeight="semibold" mb={4}>
                Kategorier
            </Heading>

            <List spacing={2} styleType="none">
                <ListItem>
                    <CategoryItem label="Alla kategorier" />
                </ListItem>
                {items.map((item) => (
                    <ListItem key={item.label}>
                        <CategoryItem {...item} />
                    </ListItem>
                ))}
            </List>
        </Flex>
    );
};
