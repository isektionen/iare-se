import { Box, VStack, Heading, Stack, Grid } from "@chakra-ui/layout";
import Fuse from "fuse.js";
import useTranslation from "next-translate/useTranslation";
import React, { useState, useEffect, useMemo } from "react";
import { Representative } from "types/strapi";
import _ from "underscore";
import { ContactMenu } from "./ContactMenu";
import { ContactSearch } from "./ContactSearch";
import { StackItem } from "./StackItem";

type Item = {
    value: string;
    isSelected: boolean;
};

interface Option {
    label: string;
    value: string | number;
}

interface Props {
    representatives: Record<string, Representative[]>;
    objectives: Option[];
}
export const ContactSelector = ({ representatives, objectives }: Props) => {
    const { t } = useTranslation("contact");

    const allLabel = t("selector.all");

    const [items, setSelected] = useState<Item[]>(
        objectives.map((obj) => {
            return {
                value: obj.label,
                isSelected: obj.label === t("selector.all"),
            };
        })
    );

    useEffect(() => {
        const _items = objectives.map((obj) => {
            return {
                value: obj.label,
                isSelected: obj.label === allLabel,
            };
        });
        setSelected(_items);
    }, [allLabel, objectives]);

    const selected = useMemo(
        () => items?.find((item) => item.isSelected),
        [items]
    );

    const [searchTerm, setSearchTerm] = useState<string>();
    const specificRepresentatives = useMemo(() => {
        if (searchTerm && searchTerm !== "") {
            const group = representatives[allLabel];
            const fuse = new Fuse(group, {
                keys: ["user.firstname", "user.lastname", "tags"],
                threshold: 0.3,
            });
            const result = fuse.search(searchTerm);
            return _.pluck(result, "item") || [];
        }
        if (
            selected &&
            representatives &&
            _.has(representatives, selected.value)
        ) {
            const group = representatives[
                selected.value
            ].flat() as Representative[];
            return group || [];
        }
        return [];
    }, [allLabel, representatives, searchTerm, selected]);

    return (
        <Box
            w={{ base: "full", lg: "3xl" }}
            minW={{ base: "full", lg: "28rem" }}
            p={6}
            bg="white"
            shadow="2xl"
            rounded="md"
            borderWidth="1px"
            borderColor="gray.200"
        >
            <VStack spacing={4} align="stretch">
                <Heading size="lg">{t("recipient")}</Heading>
                <Stack
                    direction={{ base: "column-reverse", sm: "row" }}
                    spacing={4}
                >
                    <ContactMenu
                        w={{ base: "full", sm: 60 }}
                        items={items}
                        setItems={setSelected}
                    />

                    <ContactSearch onSearch={setSearchTerm} />
                </Stack>
                <Box
                    h="md"
                    overflowY="scroll"
                    borderColor="gray.200"
                    borderWidth="1px"
                    rounded="lg"
                >
                    <Grid
                        templateColumns={{
                            base: "25% 50% 25%",
                            md: "15% 60% 25%",
                        }}
                        templateRows={`repeat(${specificRepresentatives.length},1fr)`}
                    >
                        {specificRepresentatives.length > 0 &&
                            specificRepresentatives.map((rep, i) => (
                                <StackItem key={"specific-rep-" + i} {...rep} />
                            ))}
                    </Grid>
                </Box>
            </VStack>
        </Box>
    );
};
