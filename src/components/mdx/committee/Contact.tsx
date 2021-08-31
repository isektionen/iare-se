import {
    Avatar,
    Box,
    BoxProps,
    Center,
    Flex,
    Heading,
    HStack,
    Spacer,
    Stack,
    Text,
    VStack,
} from "@chakra-ui/react";
import React from "react";
import { useCommittee } from "state/committee";
import { Representative, CommitteeFunction } from "types/strapi";
import _ from "underscore";

interface Props extends BoxProps {}

interface ICard {
    size: number;
    fullname: string;
    imgsrc: string;
    role: string;
    email: string;
}

const Card = ({ size, fullname, imgsrc, role, email }: ICard) => {
    const _size =
        size === 1 ? "xl" : size === 2 ? "lg" : size === 3 ? "md" : "sm";
    return (
        <Stack spacing={4} direction={{ base: "column", md: "row" }}>
            <Avatar
                size={_size}
                name={fullname}
                src={imgsrc}
                alignSelf={{ base: "center", md: "flex-start" }}
            />
            <VStack spacing={1} align={{ base: "center", md: "flex-start" }}>
                <Heading size="md">{fullname}</Heading>
                <Text color="gray.600">{role}</Text>
                <Text color="gray.600">{email}</Text>
            </VStack>
        </Stack>
    );
};

export const Contact = ({ ...props }: Props) => {
    const committee = useCommittee();
    if (!committee) {
        return <></>;
    }

    const count = committee?.contacts?.length ?? 0;
    return (
        <Flex>
            <Stack
                p={6}
                spacing={4}
                direction={{ base: "column", md: "row" }}
                {...props}
            >
                {committee.contacts?.map((user) => {
                    const imgsrc = user?.cover?.url;
                    const fullname =
                        user?.user?.firstname + " " + user?.user?.lastname;
                    const _role = _.first(
                        user?.committee_roles as CommitteeFunction[]
                    );
                    const role = _role?.role;
                    const email = _role?.contact;
                    if (!user) {
                        return <></>;
                    }
                    return (
                        <Card
                            size={count}
                            key={user.id}
                            fullname={fullname}
                            imgsrc={imgsrc as string}
                            role={role as string}
                            email={email as string}
                        />
                    );
                })}
            </Stack>
        </Flex>
    );
};
