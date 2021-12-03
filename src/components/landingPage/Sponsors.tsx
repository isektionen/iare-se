import { Grid, GridItem } from "@chakra-ui/react";
import { NextImage } from "components/NextImage";
import AccessibleLink from "components/AccessibleLink";
import React from "react";

export const Sponsors = () => {

    const sponsors: { [key: string]: string } = {
        "applied-value": "https://appliedvaluegroup.com/",
        "capgemini-invent": "https://www.capgemini.com/service/invent/",
        "kearney": "https://www.kearney.com/",
        "emc": "https://www.ericsson.com/en/careers/strategic-programs-practice/",
        "bcg": "https://www.bcg.com/en-nor/",
        "bearingpoint": "https://www.bearingpoint.com/en/",
        "deloitte": "https://www2.deloitte.com/se/sv.html/",
        "kpmg": "https://home.kpmg/se/sv/home.html/",
        "pwc": "https://www.pwc.se/",
    };


    return (
        <Grid
            templateColumns="repeat(3, 1fr)"
            bg="gray.50"
            py={8}
            px={{ base: 4, md: 12 }}
        >
            {Object.keys(sponsors).map((sponsor) => (
                <GridItem key={sponsor} colSpan={1} rowSpan={1}>
                    <AccessibleLink href={sponsors[sponsor]}>
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
                            title={sponsor.toUpperCase().replace("-", " ")}
                        />
                    </AccessibleLink>
                </GridItem>
            ))}
            {/*<Button variant="iareSolid" w="lg">
                Vill du synas här?
                </Button>*/}
        </Grid>
    );
};
