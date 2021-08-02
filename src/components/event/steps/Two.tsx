import { Box, Heading, StackDivider, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import { Allergy, Diet } from "types/strapi";
import { OptionsInput } from "../OptionsInput";

interface Props {
    label: string;
    diets: Diet[];
    allergies: Allergy[];
    dietResult: any;
    setDietResult: any;
    specialDietResult: any;
    setSpecialDietResult: any;
}

export const Two = ({
    label,
    diets,
    allergies,
    dietResult,
    setDietResult,
    specialDietResult,
    setSpecialDietResult,
}: Props) => {
    const { t } = useTranslation("event");
    return (
        <motion.div>
            <Heading size="lg" fontWeight="700" mb={16}>
                {label}
            </Heading>
            <VStack spacing={14} align="stretch">
                <OptionsInput
                    name={t("diet.label")}
                    description={t("diet.description")}
                    options={diets.map((entity) => ({
                        value: entity.id,
                        label: entity.name,
                    }))}
                    result={dietResult}
                    setResult={setDietResult}
                    placeholder={t("diet.search.placeholder")}
                    createText={t("diet.search.createText")}
                />

                <OptionsInput
                    name={t("allergen.label")}
                    description={t("allergen.description")}
                    options={allergies.map((entity) => ({
                        value: entity.id,
                        label: entity.name,
                    }))}
                    result={specialDietResult}
                    setResult={setSpecialDietResult}
                    placeholder={t("allergen.search.placeholder")}
                    createText={t("allergen.search.createText")}
                />
            </VStack>
        </motion.div>
    );
};
