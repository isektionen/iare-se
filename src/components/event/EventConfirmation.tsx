import {
    Box,
    BoxProps,
    Button,
    Divider,
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

interface Props extends Omit<BoxProps, "onSubmit"> {
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
    register: any;
    errors: any;
    isSubmitting: boolean;
}

export const EventConfirmation = ({
    title,
    firstName,
    lastName,
    email,
    phoneNumber,
    button,
    onSubmit,
    register,
    errors,
    isSubmitting,
    ...rest
}: Props) => {
    return (
        <Box key="step-three" {...rest}>
            <Heading size="lg" fontWeight="700">
                {title}
            </Heading>
            <Divider mt={4} mb={8} />

            <VStack spacing={3}>
                <HStack spacing={2} w="full">
                    <FormControl isInvalid={errors.firstName} isRequired>
                        <FormLabel htmlFor="fname">{firstName.label}</FormLabel>
                        <Input
                            id="fname"
                            placeholder={firstName.placeholder}
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
                        <FormLabel htmlFor="lname">{lastName.label}</FormLabel>
                        <Input
                            id="lname"
                            placeholder={lastName.placeholder}
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
                    <FormLabel htmlFor="email">{email.label}</FormLabel>
                    <Input
                        id="email"
                        placeholder={email.placeholder}
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
                    <FormLabel htmlFor="phone">{phoneNumber.label}</FormLabel>
                    <Input
                        id="phone"
                        placeholder={phoneNumber.placeholder}
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
                borderRadius="full"
                type="submit"
                variant="iareSolid"
                isLoading={isSubmitting}
            >
                {button.label}
            </Button>
        </Box>
    );
};
