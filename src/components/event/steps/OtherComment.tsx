import {
    Box,
    BoxProps,
    Divider,
    Heading,
    StackDivider,
    VStack,
} from "@chakra-ui/react";
import { None } from "framer-motion";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import { Allergy, Diet, Maybe, ComponentEventOtherComment } from "types/strapi";
import { OptionsInput } from "../OptionsInput";

interface Props extends BoxProps {
    label: string;
    otherCommentLabel: ComponentEventOtherComment;
    diets: Diet[];
    allergies: Allergy[];
    dietResult: any;
    setDietResult: any;
    specialDietResult: any;
    setSpecialDietResult: any;
}

export const OtherComment = ({
    label,
    otherCommentLabel,
    diets,
    allergies,
    dietResult,
    setDietResult,
    specialDietResult,
    setSpecialDietResult,
    ...rest
}: Props) => {
    const { t, lang } = useTranslation("event");

    var visibleLabel = lang === "en" ? otherCommentLabel?.commentLabelEnglish : otherCommentLabel?.commentLabelSwedish;

    if (!visibleLabel) {
        // If the correct language does not have a label, choose the incorrect language
        visibleLabel = lang !== "en" ? otherCommentLabel?.commentLabelEnglish : otherCommentLabel?.commentLabelSwedish;
    }

    if (!visibleLabel) {
        // If no label is available use the standard "other comment" label
        visibleLabel = label;
    }
    

    return (
        <Box key="step-two" {...rest}>
            <Heading size="lg" fontWeight="700">
                {visibleLabel}
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
