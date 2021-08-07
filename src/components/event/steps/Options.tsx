import {
    Box,
    BoxProps,
    Divider,
    Heading,
    StackDivider,
    VStack,
} from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import { Allergy, Diet } from "types/strapi";
import { OptionsInput } from "../OptionsInput";

interface Props extends BoxProps {
    label: string;
    diets: Diet[];
    allergies: Allergy[];
    dietResult: any;
    setDietResult: any;
    specialDietResult: any;
    setSpecialDietResult: any;
}

export const Options = ({
    label,
    diets,
    allergies,
    dietResult,
    setDietResult,
    specialDietResult,
    setSpecialDietResult,
    ...rest
}: Props) => {
    const { t } = useTranslation("event");

    return (
        <Box key="step-two" {...rest}>
            <Heading size="lg" fontWeight="700">
                {label}
            </Heading>
            <Divider mt={4} mb={8} />

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
        </Box>
    );
};
