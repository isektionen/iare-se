import { Box } from "@chakra-ui/layout";
import React from "react";
import { isMobileSafari } from "react-device-detect";

interface Props {
    children: JSX.Element | JSX.Element[];
}

export const WrapPadding = ({ children }: Props) => {
    return <Box pb={isMobileSafari ? 16 : 0}>{children}</Box>;
};
