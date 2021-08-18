import {
    Box,
    BoxProps,
    Button,
    Flex,
    HStack,
    Popover,
    PopoverBody,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
    Spacer,
    Textarea,
    useRadio,
    useRadioGroup,
    Text,
    useBreakpointValue,
    Icon,
    Placement,
    Tooltip,
    IconButton,
    Checkbox,
    useDisclosure,
    useOutsideClick,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    Input,
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    FormControl,
    useToast,
} from "@chakra-ui/react";
import { MDXLayout } from "components/mdx/Layout";
import useTranslation from "next-translate/useTranslation";
import React, { useRef, useState } from "react";
import { isMobile } from "react-device-detect";
import {
    FormProvider,
    useController,
    useForm,
    useFormContext,
} from "react-hook-form";
import { HiQuestionMarkCircle } from "react-icons/hi";
import { MdFeedback } from "react-icons/md";
import { useRecoilValue } from "recoil";
import { layout } from "state/layout";

interface Submit {
    onSubmit: (data: any) => Promise<void>;
}

const RadioEmojiCard = (props: any) => {
    const { getInputProps, getCheckboxProps } = useRadio(props);

    const input = getInputProps();
    const checkbox = getCheckboxProps();

    return (
        <Box as="label">
            <input {...input} />
            <Box
                {...checkbox}
                cursor="pointer"
                filter="grayscale(1)"
                scale={1}
                transition="all .5s ease-in-out"
                _checked={{ filter: "grayscale(0)", transform: "scale(1.25)" }}
                _hover={{ filter: "grayscale(0)", transform: "scale(1.25)" }}
            >
                {props.children}
            </Box>
        </Box>
    );
};

const FeedbackHeader = () => {
    const { t } = useTranslation("common");
    const { feedbackbox } = useRecoilValue(layout("header"));

    const ref = useRef(null);

    const { isOpen, onToggle, onClose } = useDisclosure();
    useOutsideClick({
        ref,
        handler: onClose,
    });
    const tooltipVariant = useBreakpointValue({
        base: "auto",
        md: "left-end",
    }) as Placement;

    return (
        <Flex align="center">
            <Text>{t("header.feedback.header")}</Text>
            <Box ml={2}>
                {!isMobile && (
                    <Tooltip
                        ref={ref}
                        label={feedbackbox && feedbackbox.description}
                        placement={tooltipVariant}
                        isOpen={isOpen}
                    >
                        <IconButton
                            variant="unstyled"
                            aria-label="Explaination"
                            _active={{
                                borderWidth: 0,
                            }}
                            _focus={{
                                borderWidth: 0,
                            }}
                            onClick={onToggle}
                            icon={<HiQuestionMarkCircle />}
                        />
                    </Tooltip>
                )}
            </Box>
        </Flex>
    );
};

const FeedbackFooter = ({ onSubmit }: Submit) => {
    const { t } = useTranslation("common");
    const options = ["🥸", "🤩", "😭", "🤬", "😤"];

    const { register, control, handleSubmit, reset } = useFormContext();
    const checkboxName = "publishable";
    const radioboxName = "emotion";
    const {
        field: checkboxField,
        formState: { errors },
    } = useController({
        control,
        name: checkboxName,
    });
    const { field: radioboxField } = useController({
        control,
        name: radioboxName,
    });
    const { getRootProps, getRadioProps } = useRadioGroup({
        name: "feedback-emotions",
        defaultValue: options[0],
        onChange: radioboxField.onChange,
    });

    const group = getRootProps();

    return (
        <Box>
            <FormControl isInvalid={!!errors[checkboxName]}>
                <Checkbox
                    defaultChecked
                    colorScheme="brand"
                    {...register("publishable")}
                    onChange={checkboxField.onChange}
                >
                    {t("header.feedback.publishable")}
                </Checkbox>
            </FormControl>
            <Flex align="center">
                <FormControl isInvalid={!!errors[radioboxName]}>
                    <HStack spacing={2} {...group}>
                        {options.map((value, i) => {
                            const radio = getRadioProps({ value });
                            return (
                                <RadioEmojiCard key={"option-" + i} {...radio}>
                                    {value}
                                </RadioEmojiCard>
                            );
                        })}
                    </HStack>
                </FormControl>
                <Spacer />
                <Button variant="outline" onClick={handleSubmit(onSubmit)}>
                    {t("header.feedback.submit")}
                </Button>
            </Flex>
        </Box>
    );
};

const FeedbackBody = ({ onSubmit }: Submit) => {
    const { feedbackbox } = useRecoilValue(layout("header"));
    const { t } = useTranslation("common");
    const { register } = useFormContext();

    return (
        <>
            {isMobile && <Text mb={4}>{feedbackbox?.description}</Text>}
            <Textarea
                h={isMobile ? "xs" : undefined}
                placeholder={t("header.feedback.textarea")}
                {...register("content")}
            ></Textarea>
            {!isMobile && <FeedbackFooter onSubmit={onSubmit} />}
        </>
    );
};

export const Feedback = () => {
    const { t } = useTranslation("common");

    const toast = useToast();

    const variant = useBreakpointValue({
        base: "",
        lg: t("header.feedback.trigger"),
    });

    const popoverVariant = useBreakpointValue({
        base: { placement: "bottom-start", gutter: 8 },
        md: { placement: "bottom", gutter: 8 },
    }) as { placement: Placement; gutter: number };

    const {
        isOpen: isOpenDrawer,
        onOpen: onOpenDrawer,
        onClose: onCloseDrawer,
    } = useDisclosure();
    const btnRef = useRef<HTMLButtonElement>(null);
    const cancelRef = useRef<HTMLButtonElement>(null);

    const methods = useForm({
        defaultValues: {
            emotion: "🥸",
            content: "",
            publishable: true,
        },
    });

    const [isOpenAlert, setIsOpenAlert] = useState(false);

    const checkIfClosable = () => {
        if (isMobile && methods.getValues("content").length > 0) {
            setIsOpenAlert(true);
        } else {
            onCloseDrawer();
        }
    };

    const onSubmit = async (data: any) => {
        const result = await fetch("/api/feedback", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (result.ok) {
            methods.reset();
            if (isMobile) {
                onCloseDrawer();
            }
            toast({
                title: t("header.feedback.toast.title"),
                description: t("header.feedback.toast.description"),
                status: "success",
                duration: 3500,
                isClosable: true,
            });
            return;
        }
    };

    return (
        <FormProvider {...methods}>
            <Box as="form">
                {isMobile && (
                    <>
                        <AlertDialog
                            isOpen={isOpenAlert}
                            leastDestructiveRef={cancelRef}
                            onClose={() => setIsOpenAlert(false)}
                            motionPreset="slideInBottom"
                            isCentered
                            size="sm"
                        >
                            <AlertDialogOverlay>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        {t("header.feedback.alert.header")}
                                    </AlertDialogHeader>
                                    <AlertDialogBody>
                                        {t("header.feedback.alert.body")}
                                    </AlertDialogBody>
                                    <AlertDialogFooter>
                                        <Button
                                            onClick={() => {
                                                setIsOpenAlert(false);
                                                onCloseDrawer();
                                            }}
                                        >
                                            {t("header.feedback.alert.submit")}
                                        </Button>
                                        <Button
                                            onClick={() =>
                                                setIsOpenAlert(false)
                                            }
                                            ml={3}
                                            ref={cancelRef}
                                        >
                                            {t("header.feedback.alert.cancel")}
                                        </Button>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialogOverlay>
                        </AlertDialog>
                        <Button
                            ref={btnRef}
                            variant="iareSolid"
                            size="sm"
                            onClick={onOpenDrawer}
                        >
                            <Icon as={MdFeedback} mr={{ base: 0, lg: 2 }} />{" "}
                            {variant}
                        </Button>
                        <Drawer
                            isOpen={isOpenDrawer}
                            placement="left"
                            onClose={checkIfClosable}
                            finalFocusRef={btnRef}
                        >
                            <DrawerOverlay />
                            <DrawerContent>
                                <DrawerCloseButton />
                                <DrawerHeader>
                                    <FeedbackHeader />
                                </DrawerHeader>

                                <DrawerBody>
                                    <FeedbackBody onSubmit={onSubmit} />
                                </DrawerBody>

                                <DrawerFooter>
                                    <FeedbackFooter onSubmit={onSubmit} />
                                </DrawerFooter>
                            </DrawerContent>
                        </Drawer>
                    </>
                )}
                {!isMobile && (
                    <Popover
                        placement={popoverVariant?.placement ?? "bottom"}
                        closeOnBlur
                        closeOnEsc
                        gutter={popoverVariant?.gutter ?? 8}
                    >
                        <PopoverTrigger>
                            <Button variant="iareSolid" size="sm">
                                <Icon as={MdFeedback} mr={{ base: 0, lg: 2 }} />{" "}
                                {variant}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent minW="350px">
                            <PopoverHeader>
                                <FeedbackHeader />
                            </PopoverHeader>

                            <PopoverBody>
                                <FeedbackBody onSubmit={onSubmit} />
                            </PopoverBody>
                        </PopoverContent>
                    </Popover>
                )}
            </Box>
        </FormProvider>
    );
};
