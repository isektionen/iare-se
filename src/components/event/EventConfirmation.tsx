import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    HStack,
    Input,
    Text,
    VStack,
} from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import { IConfirmation } from "types/checkout";

interface Props {
    title: string;
    firstName: {
        label: string;
        placeholder: string;
    };
    lastName: {
        label: string;
        placeholder: string;
    };
    email: {
        label: string;
        placeholder: string;
    };
    phoneNumber: {
        label: string;
        placeholder: string;
    };
    button: {
        label: string;
    };
    onSubmit: (values: IConfirmation) => void;
}

export const EventConfirmation = (props: Props) => {
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm();

    return (
        <Box key="step-three" p={6}>
            <Heading size="lg" fontWeight="700" mb={16}>
                {props.title}
            </Heading>
            <form onSubmit={handleSubmit(props.onSubmit)} autoComplete="on">
                <VStack spacing={3}>
                    <HStack spacing={2} w="full">
                        <FormControl isInvalid={errors.firstName} isRequired>
                            <FormLabel htmlFor="fname">
                                {props.firstName.label}
                            </FormLabel>
                            <Input
                                id="fname"
                                placeholder={props.firstName.placeholder}
                                autoComplete="on"
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
                                {...register("firstName", {
                                    required: "This is required",
                                    minLength: {
                                        value: 2,
                                        message: "Minimum length should be 2",
                                    },
                                })}
                            />
                            <FormErrorMessage>
                                {errors.firstName && errors.firstName.message}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={errors.lastName} isRequired>
                            <FormLabel htmlFor="lname">
                                {props.lastName.label}
                            </FormLabel>
                            <Input
                                id="lname"
                                placeholder={props.lastName.placeholder}
                                autoComplete="on"
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
                                {...register("lastName", {
                                    required: "This is required",
                                    minLength: {
                                        value: 2,
                                        message: "Minimum length should be 2",
                                    },
                                })}
                            />
                            <FormErrorMessage>
                                {errors.lastName && errors.lastName.message}
                            </FormErrorMessage>
                        </FormControl>
                    </HStack>
                    <FormControl isInvalid={errors.email} isRequired>
                        <FormLabel htmlFor="email">
                            {props.email.label}
                        </FormLabel>
                        <Input
                            id="email"
                            placeholder={props.email.placeholder}
                            autoComplete="on"
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
                            {...register("email", {
                                required: "This is required",
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message:
                                        "Entered value does not match email format",
                                },
                            })}
                        />
                        <FormErrorMessage>
                            {errors.email && errors.email.message}
                        </FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={errors.phoneNumber} isRequired>
                        <FormLabel htmlFor="phone">
                            {props.phoneNumber.label}
                        </FormLabel>
                        <Input
                            id="phone"
                            placeholder={props.phoneNumber.placeholder}
                            autoComplete="on"
                            type="tel"
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
                            {...register("phoneNumber", {
                                required: "This is required",
                            })}
                        />
                        <FormErrorMessage>
                            {errors.phoneNumber && errors.phoneNumber.message}
                        </FormErrorMessage>
                    </FormControl>
                </VStack>
                <Button
                    mt={6}
                    isFullWidth
                    isLoading={isSubmitting}
                    borderRadius="full"
                    type="submit"
                    variant="iareSolid"
                >
                    {props.button.label}
                </Button>
            </form>
        </Box>
    );
};
