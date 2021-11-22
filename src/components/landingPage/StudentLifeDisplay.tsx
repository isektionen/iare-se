import { Grid, GridItem } from "@chakra-ui/react";
import { NextImage } from "components/NextImage";
import Image, { ImageProps } from "next/image";
import React from "react";

export const StudentLifeDisplay = () => {
    const imageNames = [
        "fencing",
        "kravallen",
        "medals",
        "reception",
        "pride",
        "dinner",
    ];
    return (
        <Grid
            templateColumns="repeat(3, 1fr)"
            bg="white"
            py={0}
            px={0}
        >
            {imageNames.map((image) => (
                <GridItem key={image} colSpan={1} rowSpan={1}>
                    <Image
                        justifyContent="center"
                        px={0}
                        py={0}
                        layout="responsive"
                        w="100%"
                        src={`/student-life-images/${image}.jpg`}
                        width="100"
                        height="65"
                        objectPosition="contain"
                        objectFit="fill"
                        title={image.replace("-", " ")}
                    />
                </GridItem>
            ))}
        </Grid>
    );
};
