import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { useToast } from "@chakra-ui/toast";
import { client } from "lib/mailchimp";
import React from "react";
import { useForm } from "react-hook-form";
import { validateEmail } from "utils/text";

interface DefaultFields {
    email: string;
}

export const NewsLetter = () => {
    const toast = useToast();

    const { handleSubmit, watch, register } = useForm<DefaultFields>();

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
        <>
            <pre>{JSON.stringify(watch())}</pre>
            <form onSubmit={handleSubmit(submit)}>
                <Input
                    id="email"
                    placeholder=""
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
                    {...register("email")}
                />
                <Button variant="iareSolid" type="submit">
                    Subscribe
                </Button>
            </form>
        </>
    );
};
