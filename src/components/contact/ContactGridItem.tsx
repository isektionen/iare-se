import { Box, Flex, Tag } from "@chakra-ui/react";
import { LinkComponent } from "components/LinkComponent";
import { NextImage } from "components/NextImage";
import React, { useState, useMemo } from "react";
import { Representative, CommitteeFunction } from "types/strapi";
import _ from "underscore";
import { capitalize } from "utils/text";

export const CustomGridItem = (representative: Representative) => {
    const [isHover, setHover] = useState(false);

    const roles = useMemo(
        () => representative.committee_roles,
        [representative.committee_roles]
    );
    const fullName = useMemo(
        () =>
            representative.user?.firstname +
            " " +
            representative.user?.lastname,
        [representative.user?.firstname, representative.user?.lastname]
    );

    const href = useMemo(() => {
        const rep = _.first(
            representative.committee_roles as CommitteeFunction[]
        );
        if (!rep) return;
        return "/contact/" + rep.slug;
    }, [representative.committee_roles]);
    return (
        <LinkComponent
            as={Flex}
            href={href || "/contact/"}
            transition="box-shadow 0.2s ease-in"
            shadow={isHover ? "xl" : "md"}
            rounded="md"
            flexDirection="column"
            bg="white"
            maxH="200px"
            overflow="hidden"
            onTouchStart={() => setHover(true)}
            onTouchEnd={() => setHover(false)}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <NextImage
                borderTopRadius="lg"
                overflow="hidden"
                transition="filter 0.2s ease-in"
                filter={isHover ? "brightness(115%)" : "brightness(100%)"}
                w="100%"
                h="80%"
                layout="intrinsic"
                width={300 * 3}
                height={200 * 3}
                objectFit="cover"
                objectPosition="center"
                src="https://iare-strapi-backend.s3.eu-north-1.amazonaws.com/photo_1542156822_6924d1a71ace_4ec5bc5630.webp"
                priority
            />
            <Box p={2} position="relative">
                <Flex
                    position="absolute"
                    top="-16px"
                    p={2}
                    h="30px"
                    w="full"
                    left="0"
                    zIndex="1"
                    justify="center"
                >
                    {roles?.map((item, key) => (
                        <Tag
                            key={item?.id ?? key}
                            colorScheme="brand"
                            size="sm"
                            fontWeight="medium"
                            rounded="full"
                            shadow="lg"
                        >
                            {item?.role && capitalize(item?.role)}
                        </Tag>
                    ))}
                </Flex>
                {fullName}
            </Box>
        </LinkComponent>
    );
};
