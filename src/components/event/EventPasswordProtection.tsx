import {
    Button,
    Center,
    Flex,
    Icon,
    Input,
    InputGroup,
    InputRightElement,
    VStack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import React from "react";
import { BsShieldLockFill } from "react-icons/bs";
import { IPasswordProtect } from "types/checkout";

interface Props {
    onSubmit: (values: IPasswordProtect) => void;
    placeholderText: string;
    showLabel: string;
    hideLabel: string;
    submitLabel: string;
}

export const EventPasswordProtection = (props: Props) => {
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm();
    const [show, setShow] = React.useState(false);
    const handleClick = () => setShow(!show);
    return (
        <Center w="full">
            <Flex direction="column" p={4}>
                <form onSubmit={handleSubmit(props.onSubmit)}>
                    <VStack>
                        <Icon as={BsShieldLockFill} boxSize={24} mb={10} />
                        <InputGroup size="md">
                            <Input
                                pr="4.5rem"
                                type={show ? "text" : "password"}
                                placeholder={props.placeholderText}
                                variant="filled"
                                bg="porter.100"
                                _hover={{
                                    bg: "porter.200",
                                }}
                                _active={{
                                    bg: "porter.400",
                                }}
                                _focus={{
                                    bg: "porter.100",
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
        </Center>
    );
};
