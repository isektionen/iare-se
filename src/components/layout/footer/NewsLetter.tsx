import {
    Input,
    InputGroup,
    InputRightElement,
    Button,
    Flex,
    Box,
    Heading,
    Text,
    Spacer,
    Circle,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import { client } from "lib/mailchimp";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import { useForm } from "react-hook-form";
import { validateEmail } from "utils/text";

interface DefaultFields {
    email: string;
}

export const NewsLetter = () => {
    const toast = useToast();
    const { t } = useTranslation("common");

    const { handleSubmit, register } = useForm<DefaultFields>();

    const submit = async (data: DefaultFields) => {
        if (validateEmail(data.email)) {
            toast({
                title: "Email successfully added!",
                description:
                    "We have sent a confirmation email to " + data.email,
                status: "success",
                duration: 5555,
                isClosable: true,
            });
            const res = client.subscribe({ email: data.email });
            return;
        }
        toast({
            title: "Invalid Email",
            description:
                "We couldn't add your email to our newsletter. Try a valid email",
            status: "error",
            duration: 5555,
            isClosable: true,
        });
    };
    return (
        <Flex
            rounded="md"
            borderWidth="1px"
            borderColor="gray.200"
            align="stretch"
            h={48}
            shadow="2xl"
            direction="row"
            p={6}
        >
            <Circle bg="gray.50" size={16}>
                <Heading size="lg">👋</Heading>
            </Circle>
            <Flex direction="column" ml={4} w="full">
                <Box>
                    <Heading size="lg" color="gray.500">
                        {t("footer.newsletter.title")}
                    </Heading>
                    <Text my={2}>{t("footer.newsletter.description")}</Text>
                </Box>
                <Spacer />
                <Box as="form" onSubmit={handleSubmit(submit)}>
                    <InputGroup>
                        <Input
                            isFullWidth
                            id="email"
                            autoComplete="on"
                            variant="filled"
                            bg="gray.50"
                            placeholder={t("footer.newsletter.placeholder")}
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
                            {...register("email")}
                        />
                        <InputRightElement w="7rem">
                            <Button
                                h="1.75rem"
                                size="sm"
                                variant="iareSolid"
                                type="submit"
                                mx={2}
                            >
                                {t("footer.newsletter.subscribe")}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </Box>
            </Flex>
        </Flex>
    );
};
