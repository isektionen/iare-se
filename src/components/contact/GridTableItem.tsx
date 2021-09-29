import { BoxProps, GridItem } from "@chakra-ui/react";
import React from "react";

interface IGridTableItem extends BoxProps {
    children: any | any[];
}
export const GridTableItem = ({ children, ...props }: IGridTableItem) => {
    return (
        <GridItem
            colSpan={1}
            rowSpan={1}
            borderBottomWidth="1px"
            display="flex"
            alignItems="center"
            py={1}
            minH="60px"
            {...props}
        >
            {children}
        </GridItem>
    );
};
