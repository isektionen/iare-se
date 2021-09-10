import {
    Box,
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerOverlay,
    Flex,
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
    Spacer,
    Text,
    Textarea,
    useDisclosure,
    useToast,
    VStack,
} from "@chakra-ui/react";
import { useViewport } from "hooks/use-viewport";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import { isMobile } from "react-device-detect";
import { useForm } from "react-hook-form";
import { BsBoxArrowUp } from "react-icons/bs";
import { Link, Element, Button as LinkButton } from "react-scroll";

const Form = ({ onComplete }: { onComplete: () => void }) => {
    const { t } = useTranslation("common");
    const toast = useToast();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm();

    const onSubmit = async (data: any) => {
        const result = await fetch("/api/feedback/contact", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (result.ok) {
            onComplete();
            reset();
            toast({
                title: t("footer.contact.toast.success.title"),
                description: t("footer.contact.toast.success.description"),
                status: "success",
                duration: 5000,
                isClosable: true,
            });
            return;
        }
        toast({
            title: t("footer.contact.toast.error.title"),
            description: t("footer.contact.toast.error.description"),
            status: "error",
            duration: 5000,
            isClosable: true,
        });
    };
    return (
        <Flex
            as="form"
            direction="column"
            h="full"
            p={6}
            onSubmit={handleSubmit(onSubmit)}
        >
            <Heading size="md" mb={4}>
                {t("footer.contact.title")}
            </Heading>
            <Text mb={6}>{t("footer.contact.description")}</Text>
            <FormControl isInvalid={errors.fullname}>
                <FormLabel>{t("footer.contact.fullname.label")}</FormLabel>
                <Input
                    variant="filled"
                    {...register("fullname", {
                        required: t("footer.contact.fullname.message"),
                    })}
                />
                <FormHelperText>
                    {errors.fullname && errors.fullname.message}
                </FormHelperText>
            </FormControl>
            <FormControl isInvalid={errors.email}>
                <FormLabel>{t("footer.contact.email.label")}</FormLabel>
                <Input
                    variant="filled"
                    {...register("email", {
                        required: true,
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                            message: t("footer.contact.email.message"),
                        },
                    })}
                />
                <FormHelperText>
                    {errors.email && errors.email.message}
                </FormHelperText>
            </FormControl>
            <FormControl isInvalid={errors.message}>
                <FormLabel>{t("footer.contact.message.label")}</FormLabel>
                <Textarea
                    variant="filled"
                    {...register("message", {
                        required: t("footer.contact.message.message"),
                    })}
                />
                <FormHelperText>
                    {errors.message && errors.message.message}
                </FormHelperText>
            </FormControl>
            <Spacer />
            <Button
                mt={4}
                type="submit"
                variant="iareSolid"
                isFullWidth
                isLoading={isSubmitting}
            >
                {t("footer.contact.submit")}
            </Button>
        </Flex>
    );
};

export const Contact = () => {
    const { t } = useTranslation("common");

    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef<HTMLButtonElement>(null);
    const { vh } = useViewport();

    if (isMobile) {
        return (
            <>
                <Button
                    ref={btnRef}
                    onClick={onOpen}
                    bg="white"
                    variant="outline"
                    rightIcon={<BsBoxArrowUp />}
                >
                    {t("footer.contact.trigger")}
                </Button>
                <Drawer
                    isOpen={isOpen}
                    placement="left"
                    onClose={onClose}
                    finalFocusRef={btnRef}
                >
                    <DrawerOverlay />
                    <DrawerContent>
                        <DrawerCloseButton />

                        <DrawerBody>
                            <Form onComplete={onClose} />
                        </DrawerBody>
                    </DrawerContent>
                </Drawer>
            </>
        );
    }

    return (
        <Popover placement="top-end">
            {({ isOpen, onClose }) => (
                <>
                    <Element name="popper-body">
                        <Link
                            to={isOpen ? "" : "popper-body"}
                            offset={-vh}
                            smooth
                            duration={800}
                        >
                            <PopoverTrigger>
                                <Button
                                    bg="white"
                                    variant="outline"
                                    rightIcon={<BsBoxArrowUp />}
                                >
                                    {t("footer.contact.trigger")}
                                </Button>
                            </PopoverTrigger>
                        </Link>
                    </Element>
                    <PopoverContent
                        shadow="xl"
                        rounded="lg"
                        overflow="scroll"
                        maxH="80vh"
                    >
                        <PopoverArrow />
                        <PopoverBody>
                            <Form onComplete={onClose} />
                        </PopoverBody>
                    </PopoverContent>
                </>
            )}
        </Popover>
    );
};
