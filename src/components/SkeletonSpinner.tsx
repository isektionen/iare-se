import {
    Box,
    Center,
    Flex,
    Heading,
    HeadingProps,
    Icon,
    ScaleFade,
    Spacer,
    Spinner,
    SpinnerProps,
} from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import React, { ReactNode } from "react";
import { MdEventBusy } from "react-icons/md";

interface Props extends SpinnerProps {
    children: (JSX.Element | boolean)[];
    loadingDescription?: string;
    isLoaded?: boolean;
    headingStyles?: HeadingProps;
    isBeforeDeadline?: boolean;
    isAvailable?: boolean;
}
export const SkeletonSpinner = ({
    children,
    loadingDescription,
    isLoaded,
    headingStyles,
    isBeforeDeadline,
    isAvailable,
    ...rest
}: Props) => {
    const { t } = useTranslation("event");

    if (!isBeforeDeadline || !isAvailable) {
        const title = !isBeforeDeadline
            ? t("deadline.closed")
            : !isAvailable
            ? t("ticket.max")
            : "";
        return (
            <>
                <ScaleFade in={!isLoaded} delay={0.5} unmountOnExit>
                    <Center minH="550px">
                        <Flex direction="column" align="center" h="110px">
                            <Icon as={MdEventBusy} boxSize={32} />
                            <Spacer />
                            <Heading>{title}</Heading>
                        </Flex>
                    </Center>
                </ScaleFade>
            </>
        );
    }
    return (
        <>
            <ScaleFade in={!isLoaded} delay={0.5} unmountOnExit>
                <Center minH="550px">
                    <Flex direction="column" align="center" h="110px">
                        <Spinner {...rest} />
                        <Spacer />
                        {loadingDescription && (
                            <Heading size="lg" {...headingStyles}>
                                {loadingDescription}
                            </Heading>
                        )}
                    </Flex>
                </Center>
            </ScaleFade>
            <ScaleFade in={isLoaded} delay={0.5}>
                {children}
            </ScaleFade>
        </>
    );
};
