import { Box, Center, Grid, GridItem, Heading } from "@chakra-ui/react";
import { NextImage } from "components/NextImage";
import useTranslation from "next-translate/useTranslation";
import React from "react";

export const Sponsors = () => {
    const { t, lang } = useTranslation("landingpage");

    const sponsors = [
        "applied-value",
        "capgemini-invent",
        "kearney",
        "emc",
        "bearingpoint",
        "deloitte",
        "kpmg",
        "pwc",
    ];
    const main_sponsor = "bcg";

    return (
        <Box>
            <Heading size="lg" textColor="black" pt={20} pb={0} textAlign="center">
                {t("mainpartner")}
            </Heading>
            <NextImage
                justifyContent="center"
                filter="brightness(1) grayscale(0) drop-shadow(0 0 0.25rem rgba(0,0,0,0.3))"
                w="100%"
                transition="filter 0.25s linear"
                src={`/sponsors/${main_sponsor}.svg`}
                width="530px"
                height="300px"
                my={0}
                objectPosition="center"
                objectFit="contain"
                title={main_sponsor.toUpperCase().replace("-", " ")}
            />
            <Heading size="lg" textColor="black" pt={7} pb={2} textAlign="center">
                {t("ourpartners")}
            </Heading>
            <Grid
                templateColumns="repeat(4, 1fr)"
                bg="white"
                pt={10}
                pb={20}
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
                            px={2}
                            py={2}
                            w="100%"
                            transition="filter 0.25s linear"
                            src={`/sponsors/${sponsor}.svg`}
                            width="220px"
                            height="123px"
                            objectPosition="center"
                            objectFit="contain"
                            title={sponsor.toUpperCase().replace("-", " ")}
                        />
                    </GridItem>
                ))}
                {/*<Button variant="iareSolid" w="lg">
                    Vill du synas här?
                    </Button>*/}
            </Grid>
        </Box>
    );
};
