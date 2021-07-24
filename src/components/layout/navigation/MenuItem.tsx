import {
    As,
    Box,
    BoxProps,
    chakra,
    Flex,
    Icon,
    IconProps,
} from "@chakra-ui/react";
import AccessibleLink from "components/AccessibleLink";
import AccessibleLinkOverlay from "components/AccessibleLinkOverlay";
import { motion } from "framer-motion";
import { useHover } from "hooks/use-hover";
import React, {
    useEffect,
    forwardRef,
    RefObject,
    ForwardedRef,
    Dispatch,
    SetStateAction,
} from "react";
import { IconType } from "react-icons";
import { FaAngleDown } from "react-icons/fa";
import { ComponentHeaderMenuSection } from "types/strapi";

interface Props extends ComponentHeaderMenuSection {
    isActive: boolean;
    onMouseEnter: () => void;
    setIsOpen: (value: boolean) => void;
    activeSection: ComponentHeaderMenuSection | undefined;
    isOpen: boolean;
}

const MotionBox = motion<Omit<BoxProps, "transition">>(Box);

export const MenuItem = (props: Props) => {
    return (
        <Flex
            align="center"
            px={2}
            fontWeight={props.isActive ? "bold" : "normal"}
            onMouseEnter={() => {
                if (!props.displayDropDown) {
                    props.setIsOpen(false);
                }
                props.onMouseEnter();
            }}
        >
            <AccessibleLink href={props.href}>{props.label}</AccessibleLink>
            {props.displayDropDown && (
                <MotionBox
                    p={2}
                    animate={
                        props.isOpen &&
                        (props.isActive ||
                            (props.activeSection &&
                                props.activeSection.id === props.id))
                            ? { rotate: 180 }
                            : { rotate: 360 }
                    }
                    transition={{ duration: 0.2 }}
                    initial={false}
                >
                    <FaAngleDown />
                </MotionBox>
            )}
        </Flex>
    );
};
