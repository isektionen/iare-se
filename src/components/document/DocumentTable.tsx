import {
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

interface Column {
    label: string;
    id: string;
}

interface Props {
    columns: Column[];
    children: (item: Column[]) => ReactNode;
}

[{}];

export const DocumentTable = ({ columns, children }: Props) => {
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
            {children(columns)}
        </Table>
    );
};

interface RowProps {
    header: Column[];
}

export const DocumentBody = ({ header }: RowProps) => {
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
                </Tr>
            ))}
        </Tbody>
    );
};
