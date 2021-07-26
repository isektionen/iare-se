import React, { useState } from "react";
import { UsersPermissionsUser } from "types/strapi";

import { Document, Page } from "react-pdf";
import { Box, Heading, Skeleton, Text } from "@chakra-ui/react";
import { getDate } from "utils/dates";
import { useDocument } from "hooks/use-document";
interface Props {
    category?: string;
    label: string | undefined;
    authors?: UsersPermissionsUser[];
    createdAt?: string | undefined;
    isCurrent?: boolean;
    url?: string;
}

const DocumentCard = (props: Props) => {
    let day;
    if (props.createdAt) {
        day = getDate(props.createdAt, "yyyy-MM-dd");
    }

    const { setDocument } = useDocument();

    const [loading, setLoading] = useState(true);

    const height = 180;
    if (props.isCurrent && props.url) {
        return (
            <Box
                as="article"
                mx={2}
                my={2}
                position="relative"
                onClick={() => setDocument({ href: props.url })}
                cursor="pointer"
            >
                <Box
                    w="full"
                    p={4}
                    h="125px"
                    bgGradient="linear(to-b, white 0%,white 50%, rgba(255,255,255,.5) 70%,  rgba(255,255,255,0))"
                    position="absolute"
                    zIndex={1}
                >
                    <Heading as="h2" size="md">
                        {props.label}
                    </Heading>
                    <Text>{day}</Text>
                </Box>
                <Box overflow="hidden">
                    <Skeleton
                        isLoaded={!loading}
                        height={height}
                        width={height / Math.SQRT2}
                    >
                        <Document
                            file={props.url}
                            renderMode="svg"
                            onLoadSuccess={() => setLoading(false)}
                        >
                            <Page
                                pageNumber={1}
                                renderTextLayer={false}
                                height={height}
                            />
                        </Document>
                    </Skeleton>
                </Box>
            </Box>
        );
    }
    return <></>;
};

export default DocumentCard;
