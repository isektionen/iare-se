import React, { useState, RefObject, createRef, useEffect } from "react";
import { MenuListItem } from "types/global";
import { useRouter } from "next/router";
import { ComponentHeaderMenuSection } from "types/strapi";

export interface SectionItem {
    label: string;
    href: string;
}

export interface MenuSection {
    label: string;
    href: string;
    isActive?: boolean;
    isDropDown?: boolean;
    subSection?: SectionItem[];
}

export const useMenu = () => {
    const [activeSection, setActiveSection] =
        useState<ComponentHeaderMenuSection>();
    const [isOpen, _setIsOpen] = useState<boolean>(false);
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
    const router = useRouter();

    const delayedSetIsOpen = (value: boolean, delay: number = 250) => {
        const id = setTimeout(() => {
            _setIsOpen(value);
        }, delay);
        setTimeoutId(id);
    };

    const cancelDelay = () => {
        if (timeoutId) {
            clearTimeout(timeoutId);
            setTimeoutId(null);
        }
    };

    const setIsOpen = (value: boolean) => {
        cancelDelay();
        _setIsOpen(value);
    };
    const useMenuItem = (menuSection: ComponentHeaderMenuSection) => {
        return {
            isActive: router.asPath.includes(menuSection.href),
            onMouseEnter: () => {
                if (menuSection.displayDropDown) {
                    setActiveSection(menuSection);
                    setIsOpen(true);
                }
            },
            activeSection,
            isOpen,
        };
    };
    return { useMenuItem, isOpen, setIsOpen, delayedSetIsOpen, activeSection };
};
