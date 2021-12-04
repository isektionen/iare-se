import { Box, Center, Grid, GridItem, Heading } from "@chakra-ui/react";
import { NextImage } from "components/NextImage";
import useTranslation from "next-translate/useTranslation";
import AccessibleLink from "components/AccessibleLink";
import React from "react";

export const Sponsors = () => {
    const { t, lang } = useTranslation("landingpage");

    const sponsors: { [key: string]: string } = {
        "applied-value": "https://appliedvaluegroup.com/",
        "capgemini-invent": "https://www.capgemini.com/service/invent/",
        "kearney": "https://www.kearney.com/",
        "emc": "https://www.ericsson.com/en/careers/strategic-programs-practice/",
        "bearingpoint": "https://www.bearingpoint.com/en/",
        "deloitte": "https://www2.deloitte.com/se/sv.html/",
        "kpmg": "https://home.kpmg/se/sv/home.html/",
        "pwc": "https://www.pwc.se/",
    };
    const main_sponsor = "bcg";
    const main_sponsor_link = "https://www.bcg.com/en-nor/"

    return (
        <Box>
            <Heading size="lg" textColor="black" pt={20} pb={0} textAlign="center">
                {t("mainpartner")}
            </Heading>
            <AccessibleLink href={main_sponsor_link} isExternal={true}>
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
            </AccessibleLink>
            <Heading size="lg" textColor="black" pt={7} pb={2} textAlign="center">
                {t("ourpartners")}
            </Heading>
            <Grid
                templateColumns={
                    {
                        base: "repeat(2, 1fr)",
                        md: "repeat(4, 1fr)",
                    }
                }
                bg="white"
                pt={10}
                pb={{ base: 16, md: 20 }}
                px={{ base: 4, md: 12 }}
            >
                {Object.keys(sponsors).map((sponsor) => (
                    <GridItem key={sponsor} colSpan={1} rowSpan={1}>
                        <AccessibleLink href={sponsors[sponsor]} isExternal={true}>
                            <NextImage
                                justifyContent="center"
                                filter="brightness(1) grayscale(0) drop-shadow(0 0 0.25rem rgba(0,0,0,0.3))"
                                _hover={{
                                    filter: "brightness(1) grayscale(0) drop-shadow(0 0 0.25rem rgba(0,0,0,0.3))",
                                }}
                                px={4}
                                py={4}
                                w="100%"
                                transition="filter 0.25s linear"
                                src={`/sponsors/${sponsor}.svg`}
                                width="220px"
                                height="123px"
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
        </Box>
    );
};
