import {
    Icon,
    Table,
    TableCaption,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
} from "@chakra-ui/react";
import { useDocument } from "hooks/use-document";
import { usePagination } from "hooks/use-pagination";
import { AllDocType } from "pages/chapter/document";
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
    return (
        <Table colorScheme="gray" variant="striped">
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
    );
};

interface RowProps {
    header: Column[];
    actions: Action[];
}

export const DocumentBody = ({ header, actions }: RowProps) => {
    const { currentItems } = usePagination();
    const { setDocument } = useDocument();
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
