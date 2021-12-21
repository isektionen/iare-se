import {
    Box,
    BoxProps,
    Divider,
    Heading,
    Input,
    StackDivider,
    VStack,
} from "@chakra-ui/react";
import { None } from "framer-motion";
import useTranslation from "next-translate/useTranslation";
import React, { useState } from "react";
import { Allergy, Diet, Maybe, ComponentEventOtherComment } from "types/strapi";
import { OptionsInput } from "../OptionsInput";

interface Props extends BoxProps {
    label: string;
    otherCommentLabel: ComponentEventOtherComment;
    setOtherCommentResponse: any;
    otherCommentResponseResults: any;
}

export const OtherComment = ({
    label,
    otherCommentLabel,
    setOtherCommentResponse,
    otherCommentResponseResults,
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

            <Input placeholder={visibleLabel} value={otherCommentResponseResults} onChange={e => setOtherCommentResponse(e.target.value)} />

        </Box>
    );
};
