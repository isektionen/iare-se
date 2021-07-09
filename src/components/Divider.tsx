import React from "react";
import { Divider as BaseDivider } from "@chakra-ui/react";
export const Divider = () => {
    return (
        <BaseDivider
            sx={{
                borderColor: "gray.500",
                margin: "auto",
                w: "85%",
                paddingTop: 4,
                marginBottom: 4,
            }}
        />
    );
};
