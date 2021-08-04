import {
    Button,
    Center,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Icon,
    Input,
    InputGroup,
    InputRightElement,
    ToastPosition,
    useBreakpointValue,
    useToast,
    VStack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import React, { useEffect, useRef } from "react";
import { BsShieldLockFill } from "react-icons/bs";
import { IPasswordProtect } from "types/checkout";

interface Props {
    onSubmit: (values: IPasswordProtect) => Promise<boolean>;
    placeholderText: string;
    showLabel: string;
    hideLabel: string;
    submitLabel: string;
    errorLabel: string;
    successLabel: string;
    scrollTo: () => void;
}

export const EventPasswordProtection = (props: Props) => {
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
        setError,
        setFocus,
    } = useForm();
    const [show, setShow] = React.useState(false);
    const handleClick = () => setShow(!show);

    const toast = useToast();

    const pos = useBreakpointValue({
        base: "top",
        md: "bottom",
    }) as ToastPosition;

    const isSmall = useBreakpointValue({ base: true, md: false }) as boolean;
    const id = "password";
    const onSubmit = async (event: IPasswordProtect) => {
        const res = await props.onSubmit(event);
        if (!res && !toast.isActive(id)) {
            toast({
                id,
                position: pos,
                duration: 2500,
                description: props.errorLabel,
                status: "error",
            });
        } else {
            toast({
                id,
                position: pos,
                duration: 2500,
                description: props.successLabel,
                status: "success",
            });

            if (isSmall) props.scrollTo();
        }
    };

    useEffect(() => {
        setFocus("password");
    }, [setFocus]);

    return (
        <Flex
            justify="center"
            align="center"
            w="full"
            h={{ base: "225px", md: "450px" }}
        >
            <Flex direction="column" p={4}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <VStack>
                        <Icon as={BsShieldLockFill} boxSize={24} mb={10} />
                        <InputGroup size="md">
                            <Input
                                id="password"
                                pr="4.5rem"
                                type={show ? "text" : "password"}
                                placeholder={props.placeholderText}
                                variant="filled"
                                bg="gray.50"
                                _hover={{
                                    bg: "gray.200",
                                }}
                                _active={{
                                    bg: "gray.400",
                                }}
                                _focus={{
                                    bg: "gray.50",
                                    borderColor: "blue.300",
                                }}
                                {...register("password", {
                                    required: "This is required",
                                })}
                            />
                            <InputRightElement width="4.5rem">
                                <Button
                                    h="1.75rem"
                                    size="sm"
                                    onClick={handleClick}
                                >
                                    {show ? props.hideLabel : props.showLabel}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                        <Button
                            mt={6}
                            isFullWidth
                            isLoading={isSubmitting}
                            type="submit"
                            variant="iareSolid"
                        >
                            {props.submitLabel}
                        </Button>
                    </VStack>
                </form>
            </Flex>
        </Flex>
    );
};
