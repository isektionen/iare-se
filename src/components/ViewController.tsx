import { Box } from "@chakra-ui/react";
import React from "react";
import { ClientError } from "./Error";

interface Props {
    error: boolean;
    children: any;
}

export const ViewController = ({ error, children }: Props) => {
    if (error) {
        return <ClientError />;
    }
    return (
        <Box w="full" h="full">
            {children}
        </Box>
    );
};
