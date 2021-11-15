import { Grid, GridItem } from "@chakra-ui/react";
import { NextImage } from "components/NextImage";
import React from "react";

export const Sponsors = () => {
    const sponsors = [
        "applied-value",
        "capgemini-invent",
        "kearney",
        "emc",
        "bcg",
        "bearingpoint",
        "deloitte",
        "kpmg",
        "pwc",
    ];
    return (
        <Grid
            templateColumns="repeat(3, 1fr)"
            bg="gray.50"
            py={8}
            px={{ base: 4, md: 12 }}
        >
            {sponsors.map((sponsor) => (
                <GridItem key={sponsor} colSpan={1} rowSpan={1}>
                    <NextImage
                        justifyContent="center"
                        filter="brightness(1) grayscale(0) drop-shadow(0 0 0.25rem rgba(0,0,0,0.3))"
                        _hover={{
                            filter: "brightness(1) grayscale(0) drop-shadow(0 0 0.25rem rgba(0,0,0,0.3))",
                        }}
                        px={4}
                        py={2}
                        w="100%"
                        transition="filter 0.25s linear"
                        src={`/sponsors/${sponsor}.svg`}
                        width="200px"
                        height="113px"
                        objectPosition="center"
                        objectFit="contain"
                    />
                </GridItem>
            ))}
            {/*<Button variant="iareSolid" w="lg">
                Vill du synas här?
                </Button>*/}
        </Grid>
    );
};
