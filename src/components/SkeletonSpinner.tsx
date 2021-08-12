import {
    Box,
    Center,
    Flex,
    Heading,
    HeadingProps,
    ScaleFade,
    Spacer,
    Spinner,
    SpinnerProps,
} from "@chakra-ui/react";
import React, { ReactNode } from "react";

interface Props extends SpinnerProps {
    children: (JSX.Element | boolean)[];
    loadingDescription?: string;
    isLoaded?: boolean;
    headingStyles?: HeadingProps;
}
export const SkeletonSpinner = ({
    children,
    loadingDescription,
    isLoaded,
    headingStyles,
    ...rest
}: Props) => {
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
