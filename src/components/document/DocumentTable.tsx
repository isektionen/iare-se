import {
    Box,
    Flex,
    Heading,
    Icon,
    Table,
    TableCaption,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    useBreakpointValue,
    Text,
} from "@chakra-ui/react";
import { useDocument } from "hooks/use-document";
import { usePagination } from "hooks/use-pagination";
import useTranslation from "next-translate/useTranslation";
import React, { ReactNode } from "react";
import { IconType } from "react-icons";

interface Column {
    label: string;
    id: string;
}

interface Action {
    id: string;
    icon: IconType;
    onClick: (row: any) => void;
}

interface Props {
    columns: Column[];
    children: (column: Column[], actions: Action[]) => ReactNode;
    actions: Action[];
}

[{}];

export const DocumentTable = ({ columns, actions, children }: Props) => {
    const size = useBreakpointValue({
        base: "lg",
        md: "sm",
        lg: "sm",
        xl: "md",
    });
    return (
        <Box flex={1} mb={8}>
            <Table
                colorScheme="gray"
                variant="striped"
                size={size}
                position="relative"
            >
                <Thead>
                    <Tr>
                        {columns.map((col) => (
                            <Th
                                key={col.label + col.id}
                                data-table-col={col.label + "_" + col.id}
                            >
                                {col.label}
                            </Th>
                        ))}
                    </Tr>
                </Thead>
                {children(columns, actions)}
            </Table>
        </Box>
    );
};

interface RowProps {
    header: Column[];
    actions: Action[];
}

export const DocumentBody = ({ header, actions }: RowProps) => {
    const { t } = useTranslation("document");
    const { currentItems } = usePagination();
    const { setDocument } = useDocument();

    const truncate = (text: string, cap: number = 15) =>
        text.length > cap ? text.slice(0, cap) + ".." : text;

    if (currentItems.length === 0) {
        return (
            <Tbody position="relative">
                <Tr position="absolute" w="full" h="32">
                    <Td position="absolute" w="full">
                        <Flex
                            justify="center"
                            align="center"
                            w="full"
                            h="full"
                            position="relative"
                        >
                            <Flex
                                bg="white"
                                rounded="md"
                                direction="column"
                                p={8}
                                align="center"
                            >
                                <Box>
                                    <Heading size="md" textAlign="center">
                                        {t("noEntriesFound")}
                                    </Heading>
                                </Box>
                            </Flex>
                        </Flex>
                    </Td>
                </Tr>
            </Tbody>
        );
    }
    return (
        <Tbody>
            {currentItems.map((item: { [k: string]: any }, i) => (
                <Tr
                    key={"table-row" + i}
                    cursor={item.url ? "pointer" : "none"}
                    onClick={() => {
                        if (item.url) {
                            setDocument({ href: item.url });
                        }
                    }}
                >
                    {header.map((title, j) => (
                        <Td key={"table-element" + j}>{item[title.id]}</Td>
                    ))}
                    {actions.map((action, j) => (
                        <Td key={"table-action" + j}>
                            <Icon
                                as={action.icon}
                                cursor="pointer"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    action.onClick(item);
                                }}
                            />
                        </Td>
                    ))}
                </Tr>
            ))}
        </Tbody>
    );
};
