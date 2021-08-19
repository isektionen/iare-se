import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
} from "@chakra-ui/accordion";
import { useBreakpointValue } from "@chakra-ui/media-query";
import {
    Box,
    chakra,
    Flex,
    HStack,
    Icon,
    List,
    ListItem,
    Spacer,
    Text,
} from "@chakra-ui/react";
import AccessibleLink from "components/AccessibleLink";
import MotionBox from "components/motion/Box";
import { motion } from "framer-motion";
import React from "react";
import { BsPlus } from "react-icons/bs";
import { useRecoilValue } from "recoil";
import { layout } from "state/layout";
import { ComponentHeaderMenuSection } from "types/strapi";

const ListContainer = ({
    subSection,
}: Pick<ComponentHeaderMenuSection, "subSection">) => {
    return (
        <List spacing={2} fontSize="md" color="gray.600">
            {subSection &&
                subSection.map((item) => {
                    if (item) {
                        return (
                            <ListItem
                                key={"footer-section-listitem-" + item?.id}
                            >
                                <AccessibleLink href={item?.href}>
                                    {item?.label}
                                </AccessibleLink>
                            </ListItem>
                        );
                    }
                    return <></>;
                })}
        </List>
    );
};

const ListSection = ({ label, subSection }: ComponentHeaderMenuSection) => {
    return (
        <Box>
            <Text fontWeight="700" size="lg" mb={4}>
                {subSection && subSection?.length > 0 && label}
            </Text>
            <ListContainer subSection={subSection} />
        </Box>
    );
};

const AccordionSection = ({
    label,
    subSection,
}: ComponentHeaderMenuSection) => {
    const variants = {
        open: {
            rotate: 45,
        },
        close: {
            rotate: -45,
        },
    };
    if (subSection && subSection.length === 0) {
        return <></>;
    }
    return (
        <AccordionItem
            borderTopWidth="0 !important"
            borderBottomWidth="0 !important"
        >
            {({ isExpanded }) => (
                <Flex
                    borderBottomWidth="1px"
                    direction="column"
                    borderColor="gray.100"
                >
                    <AccordionButton>
                        <Flex
                            align="center"
                            w="full"
                            flex={1}
                            justify="space-between"
                        >
                            <Text fontWeight="700" size="lg">
                                {label}
                            </Text>
                            <MotionBox
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                animate={isExpanded ? "open" : "closed"}
                                variants={variants}
                            >
                                <Icon as={BsPlus} boxSize={5} />
                            </MotionBox>
                        </Flex>
                    </AccordionButton>

                    <AccordionPanel>
                        <ListContainer subSection={subSection} />
                    </AccordionPanel>
                </Flex>
            )}
        </AccordionItem>
    );
};

export const AccordionContent = () => {
    const { sections } = useRecoilValue(layout("header"));
    return (
        <Accordion flex={1} allowToggle>
            {sections.map((item) => (
                <AccordionSection key={"footer-section-" + item.id} {...item} />
            ))}
        </Accordion>
    );
};

export const ListContent = () => {
    const { sections } = useRecoilValue(layout("header"));
    return (
        <HStack spacing={14} align="stretch">
            {sections.map((item) => (
                <ListSection key={"section-" + item.id} {...item} />
            ))}
        </HStack>
    );
};

export const PageSection = () => {
    const isAboveLg = useBreakpointValue({ base: false, lg: true });

    return (
        <Box mt={{ base: 16, lg: 0 }}>
            {isAboveLg && <ListContent />}
            {!isAboveLg && <AccordionContent />}
        </Box>
    );
};
