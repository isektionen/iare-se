import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    FormLabel,
    Heading,
    HStack,
    Input,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverContent,
    PopoverTrigger,
    Text,
    Textarea,
    VStack,
} from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import { BsBoxArrowUp } from "react-icons/bs";

const Form = () => {
    const { t } = useTranslation("common");

    return (
        <Box as="form">
            <Heading size="md" mb={4}>
                {t("footer.contact.title")}
            </Heading>
            <Text mb={6}>{t("footer.contact.description")}</Text>
            <FormControl>
                <FormLabel>{t("footer.contact.fullname")}</FormLabel>
                <Input variant="filled" />
                <FormHelperText></FormHelperText>
            </FormControl>
            <FormControl>
                <FormLabel>{t("footer.contact.email")}</FormLabel>
                <Input variant="filled" />
                <FormHelperText></FormHelperText>
            </FormControl>
            <FormControl>
                <FormLabel>{t("footer.contact.message")}</FormLabel>
                <Textarea variant="filled" />
                <FormHelperText></FormHelperText>
            </FormControl>
            <Button type="submit" variant="iareSolid" isFullWidth>
                {t("footer.contact.submit")}
            </Button>
        </Box>
    );
};

export const Contact = () => {
    const { t } = useTranslation("common");
    return (
        <Popover placement="top-end">
            <PopoverTrigger>
                <Button
                    bg="white"
                    variant="outline"
                    rightIcon={<BsBoxArrowUp />}
                >
                    {t("footer.contact.trigger")}
                </Button>
            </PopoverTrigger>
            <PopoverContent shadow="xl" p={6} rounded="lg">
                <PopoverArrow />
                <PopoverBody>
                    <Form />
                </PopoverBody>
            </PopoverContent>
        </Popover>
    );
};
