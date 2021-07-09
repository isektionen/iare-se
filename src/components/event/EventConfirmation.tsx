import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
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
        <Box
            pb={{ base: 4, md: 12 }}
            pl={{ base: 4, md: 12 }}
            pr={{ base: 4, md: 12 }}
            pt={24}
        >
            <Text
                as="h6"
                fontSize={24}
                textTransform="capitalize"
                fontWeight={500}
                mb={6}
            >
                {props.title}
            </Text>
            <form onSubmit={handleSubmit(props.onSubmit)}>
                <VStack spacing={3}>
                    <HStack spacing={2} w="full">
                        <FormControl isInvalid={errors.fname} isRequired>
                            <FormLabel htmlFor="fname">
                                {props.firstName.label}
                            </FormLabel>
                            <Input
                                id="fname"
                                placeholder={props.firstName.placeholder}
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
                                {...register("fname", {
                                    required: "This is required",
                                    minLength: {
                                        value: 2,
                                        message: "Minimum length should be 2",
                                    },
                                })}
                            />
                            <FormErrorMessage>
                                {errors.fname && errors.fname.message}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={errors.lname} isRequired>
                            <FormLabel htmlFor="lname">
                                {props.lastName.label}
                            </FormLabel>
                            <Input
                                id="lname"
                                placeholder={props.lastName.placeholder}
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
                                {...register("lname", {
                                    required: "This is required",
                                    minLength: {
                                        value: 2,
                                        message: "Minimum length should be 2",
                                    },
                                })}
                            />
                            <FormErrorMessage>
                                {errors.lname && errors.lname.message}
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
                    <FormControl isInvalid={errors.phone} isRequired>
                        <FormLabel htmlFor="phone">
                            {props.phoneNumber.label}
                        </FormLabel>
                        <Input
                            id="phone"
                            placeholder={props.phoneNumber.placeholder}
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
                            {...register("phone", {
                                required: "This is required",
                            })}
                        />
                        <FormErrorMessage>
                            {errors.phone && errors.phone.message}
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
