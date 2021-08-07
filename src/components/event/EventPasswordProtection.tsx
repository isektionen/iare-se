import {
    BoxProps,
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
import {
    FieldValues,
    RegisterOptions,
    useForm,
    UseFormSetFocus,
} from "react-hook-form";
import React, { useEffect, useRef } from "react";
import { BsShieldLockFill } from "react-icons/bs";
import { IPasswordProtect } from "types/checkout";

interface Props extends Omit<BoxProps, "onSubmit" | "scrollTo"> {
    onSubmit: () => Promise<boolean>;
    placeholderText: string;
    showLabel: string;
    hideLabel: string;
    submitLabel: string;
    errorLabel: string;
    successLabel: string;
    setFocus: UseFormSetFocus<FieldValues>;
    register: any;
}

export const EventPasswordProtection = ({
    onSubmit,
    placeholderText,
    showLabel,
    hideLabel,
    submitLabel,
    errorLabel,
    successLabel,
    setFocus,
    register,
    ...rest
}: Props) => {
    const [show, setShow] = React.useState(false);
    const handleClick = () => setShow(!show);

    const toast = useToast();

    const pos = useBreakpointValue({
        base: "top",
        md: "bottom",
    }) as ToastPosition;

    const isAboveLarge = useBreakpointValue({ base: false, lg: true });
    const id = "password";

    const handlePasswordCheck = async () => {
        const res = await onSubmit();
        if (!res && !toast.isActive(id)) {
            toast({
                id,
                position: pos,
                duration: 2500,
                description: errorLabel,
                status: "error",
            });
        } else {
            toast({
                id,
                position: pos,
                duration: 2500,
                description: successLabel,
                status: "success",
            });
        }
    };

    useEffect(() => {
        if (isAboveLarge) setFocus("password");
    }, [isAboveLarge, setFocus]);

    const handleFocus = () => {
        const dom = document.getElementById("password");
        dom?.removeAttribute("readonly");
        dom?.removeAttribute("aria-readonly");
    };
    return (
        <Flex justify="center" align="center" w="full" h="full" {...rest}>
            <Flex direction="column" p={4}>
                <VStack>
                    <Icon as={BsShieldLockFill} boxSize={24} mb={10} />
                    <InputGroup size="md">
                        <Input
                            readOnly
                            autoComplete="new-password"
                            onFocus={handleFocus}
                            onClick={handleFocus}
                            id="password"
                            pr="4.5rem"
                            type={show ? "text" : "password"}
                            placeholder={placeholderText}
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
                            {...register}
                        />
                        <InputRightElement width="4.5rem">
                            <Button h="1.75rem" size="sm" onClick={handleClick}>
                                {show ? hideLabel : showLabel}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                    <Button
                        mt={6}
                        isFullWidth
                        onClick={async () => await handlePasswordCheck()}
                        type="submit"
                        variant="iareSolid"
                    >
                        {submitLabel}
                    </Button>
                </VStack>
            </Flex>
        </Flex>
    );
};
