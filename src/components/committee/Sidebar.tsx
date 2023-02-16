import {
    Square,
    useBreakpointValue,
    Text,
    VStack,
    Button,
    BoxProps,
    Heading,
    Center,
    Spacer,
} from "@chakra-ui/react";
import { LinkComponent } from "components/LinkComponent";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import { Committee } from "types/strapi";
import { NextImage } from "components/NextImage";

export const CommitteeItem = (committee: Committee) => {
    const variant = useBreakpointValue({
        base: "",
        sm: "",
        md: committee.name,
    });
    const router = useRouter();

    // gen-i är med i dagen-i, därför blir den aktiv på dagen-i sidan
    // const isActive = router.asPath.includes(committee.slug as string);
    const isActive = router.query.slug === (committee.slug as string);

    const noText = useMemo(() => variant === "", [variant]);
    return (
        <LinkComponent
            href={`/committee/${committee.slug}`}
            as={Button}
            variant={noText ? "unstyled" : "ghost"}
            w="full"
            justifyContent="center"
            size="sm"
            textTransform="capitalize"
            bg={isActive ? "gray.200" : undefined}
        >
            <Center w="full" justifyContent={noText ? "center" : "flex-start"}>
                {committee.icon?.url !== undefined && (
                    <NextImage
                        rounded="md"
                        bg="brand.200"
                        src={committee.icon?.url ?? "/indek_template_fill.png"}
                        width="24px"
                        height="24px"
                        layout="intrinsic"
                        objectFit="contain"
                        style={{ padding: "2px" }}
                        objectPosition="center"
                        overflow="hidden"
                        mr={noText ? undefined : 2}
                    />
                )}
                {committee.icon?.url == undefined && (
                    <Square
                        rounded="md"
                        bg="brand.200"
                        w="24px"
                        h="24px"
                        mr={noText ? undefined : 2}
                    >
                        {committee.name.slice(0, 1)}
                    </Square>
                )}

                <Text>{variant}</Text>
            </Center>
        </LinkComponent>
    );
};

interface Props extends BoxProps {
    committees: Committee[];
}

export const Sidebar = ({ committees, ...props }: Props) => {
    const { t } = useTranslation("mdx");
    const isAboveMd = useBreakpointValue({ base: false, md: true });

    return (
        <VStack
            w={{ base: "0px", sm: "min-content", lg: "225px" }}
            spacing={0.5}
            align="stretch"
            {...props}
        >
            {isAboveMd && (
                <>
                    <Heading
                        size="xs"
                        textTransform="uppercase"
                        fontWeight="700"
                        pl={3}
                        pb={4}
                    >
                        {t("committees")}
                    </Heading>

                    {committees.map((committee) => (
                        <CommitteeItem key={committee.id} {...committee} />
                    ))}
                </>
            )}
        </VStack>
    );
};
