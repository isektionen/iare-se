import { VStack, Box, Heading, Stack, Text } from "@chakra-ui/layout";
import { ContactGrid } from "components/contact/ContactGrid";
import { ContactSelector } from "components/contact/ContactSelector";
import { useSanity } from "hooks/use-check-error";
import useTranslation from "next-translate/useTranslation";
import React, { useMemo } from "react";
import { useHydrater } from "state/layout";
import { LayoutProps } from "types/global";
import { CommitteeFunction, Representative } from "types/strapi";
import _ from "underscore";

interface Option {
    label: string;
    value: string | number;
}
interface Props {
    objectives: string[] | Option[];
    representatives: Record<string, Representative[]>;
}

const View = ({
    error,
    header,
    footer,
    objectives: baseObjectives,
    representatives: baseRepresentatives,
}: LayoutProps<Props>) => {
    useSanity(error);
    useHydrater({ header, footer });
    const { t } = useTranslation("contact");
    const allLabel = t("selector.all");

    const objectives = useMemo(() => {
        const allLabel = t("selector.all");
        return [allLabel, ...baseObjectives].map((obj, i) => ({
            value: i,
            label: obj as string,
        }));
    }, [baseObjectives, t]);
    const representatives = useMemo(
        () =>
            _.chain(baseRepresentatives)
                .pairs()
                .reduce((acc, [k, v]) => {
                    if (k === "__all__") {
                        return { ...acc, [allLabel]: v };
                    }
                    return { ...acc, [k]: v };
                }, {})
                .value(),
        [allLabel, baseRepresentatives]
    );

    const featuredContacts = useMemo(() => {
        return _.chain(representatives)
            .values()
            .flatten()
            .filter((rep) =>
                rep.committee_roles.some(
                    (role: CommitteeFunction) => role.featured_role
                )
            )
            .value();
    }, [representatives]);

    return (
        <VStack
            py={8}
            px={{ base: 3, md: 32 }}
            w="full"
            align="stretch"
            spacing={8}
        >
            <Box>
                <Heading mb={2}>{t("contact")}</Heading>
                <Text fontWeight="medium" color="gray.600">
                    {t("description")}
                </Text>
            </Box>
            <Stack
                w="full"
                justify="center"
                align="stretch"
                spacing={10}
                direction={{ base: "column", lg: "row" }}
            >
                <ContactSelector
                    objectives={objectives as Option[]}
                    representatives={representatives}
                />
                <ContactGrid representatives={featuredContacts} />
            </Stack>
        </VStack>
    );
};

export default View;
