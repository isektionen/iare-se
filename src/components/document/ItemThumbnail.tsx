import {
    useOutsideClick,
    chakra,
    Box,
    Center,
    Divider,
    Flex,
    Icon,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Spacer,
    Tag,
    Tooltip,
    Text,
} from "@chakra-ui/react";
import { NextImage } from "components/NextImage";
import useTranslation from "next-translate/useTranslation";
import React, { useState, useCallback, useRef } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { useDocument } from "state/document";
import { ComponentDocumentDocuments } from "types/strapi";
import { getDate } from "utils/dates";

export const ItemThumbnail = ({
    file,
    name,
    businessYear,
    current,
    category,
    date,
    size = 250,
}: ComponentDocumentDocuments & { size: number }) => {
    const { t } = useTranslation("document");
    const [isFocused, setIsFocused] = useState(false);
    const { thumbnail } = file?.formats ?? { thumbnail: undefined };
    const fullCategoryName = category?.name ?? undefined;
    const categoryName =
        fullCategoryName && fullCategoryName.length > 18
            ? fullCategoryName.slice(0, 18) + "..."
            : fullCategoryName;

    const doc = useDocument();
    const openDocument = useCallback(() => {
        if (file?.url) {
            doc({
                file: file.url,
                title: name,
            });
        }
    }, [doc, file?.url, name]);

    const handleFocus = useCallback(() => {
        setIsFocused(true);
        openDocument();
    }, [openDocument]);
    const ref = useRef<HTMLDivElement>(null);
    useOutsideClick({
        ref,
        handler: () => setIsFocused(false),
    });
    return (
        <Box
            ref={ref}
            p={2}
            rounded="lg"
            transition="all 0.35s"
            bg={"gray.50"}
            // cannot see why "full" isn't working
            w={{ base: "calc(100vw - 2em)", sm: 72 }}
            borderColor={isFocused ? "gray.500" : "gray.100"}
            borderWidth="1px"
            shadow={isFocused ? "lg" : "md"}
            cursor="pointer"
            onClick={handleFocus}
        >
            <Flex align="center">
                {categoryName && (
                    <Box>
                        <Tooltip hasArrow label={fullCategoryName}>
                            <Tag
                                fontWeight="bold"
                                colorScheme={isFocused ? "brand" : "gray"}
                            >
                                <Text>{categoryName}</Text>
                            </Tag>
                        </Tooltip>
                    </Box>
                )}
                <Spacer />
                <Menu>
                    {({ isOpen, onClose }) => (
                        <>
                            <MenuButton
                                px={4}
                                py={2}
                                onClick={(e) => {
                                    e.stopPropagation();
                                }}
                                transition="all 0.2s"
                            >
                                <Icon as={HiDotsVertical} boxSize={5} />
                            </MenuButton>
                            <MenuList>
                                <MenuItem
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        openDocument();
                                        onClose();
                                    }}
                                >
                                    {t("thumbnail.menu.open")}
                                </MenuItem>
                                {file?.url && (
                                    <MenuItem
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onClose();
                                        }}
                                    >
                                        <chakra.a
                                            href={file.url}
                                            download={name}
                                            target="_blank"
                                        >
                                            {t("thumbnail.menu.download")}
                                        </chakra.a>
                                    </MenuItem>
                                )}
                                {!file?.url && (
                                    <MenuItem isDisabled>
                                        {t("thumbnail.menu.download")}
                                    </MenuItem>
                                )}
                            </MenuList>
                        </>
                    )}
                </Menu>
            </Flex>
            <Box p={4}>
                <Center w="full" pb={4}>
                    <Center
                        bg="white"
                        p={2}
                        rounded="2xl"
                        clipPath="polygon(0% 100%, 0% 0%, 80% 0%, 100% 15%, 100% 100%)"
                        width={Math.SQRT1_2 * size * 1.1}
                        height={size * 1.1}
                    >
                        {thumbnail && (
                            <NextImage
                                src={thumbnail.url}
                                width={Math.SQRT1_2 * size}
                                height={1 * size}
                                layout="intrinsic"
                            />
                        )}
                        {!thumbnail && (
                            <chakra.span fontWeight="bold">PDF</chakra.span>
                        )}
                    </Center>
                </Center>
                <Flex align="center" direction="column">
                    <Text fontWeight="semibold" fontSize="xl" color="gray.700">
                        {name}
                    </Text>
                    <Text fontSize="md" color="gray.700">
                        {getDate(date, "dd MMM yyyy")}
                    </Text>
                    <Divider my={4} borderColor="gray.200" />
                    <Flex w="full" align="flex-start">
                        <Box>
                            <Text fontWeight="semibold">
                                {t("thumbnail.businessYear")}
                            </Text>
                            <Text color="gray.500">
                                {businessYear ? businessYear : "---"}
                            </Text>
                        </Box>
                        <Spacer />
                        <Box>
                            {current && (
                                <Tag fontWeight="bold" colorScheme="brand">
                                    {t("thumbnail.activeDocument")}
                                </Tag>
                            )}
                        </Box>
                    </Flex>
                </Flex>
            </Box>
        </Box>
    );
};
