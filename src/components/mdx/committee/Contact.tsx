import {
    Avatar,
    BoxProps,
    Heading,
    Stack,
    Text,
    VStack,
    Grid,
} from "@chakra-ui/react";
import React from "react";
import { useCommittee } from "state/committee";
import { CommitteeFunction } from "types/strapi";
import _ from "underscore";

interface Props extends BoxProps {}

interface ICard {
    fullname: string;
    imgsrc: string;
    role: string;
    email: string;
}

const Card = ({ fullname, imgsrc, role, email }: ICard) => {
    return (
        <Stack spacing={4} direction={{ base: "column", md: "row" }}>
            <Avatar size="xl" name={fullname} src={imgsrc} alignSelf="center" />
            <VStack spacing={1} align={{ base: "center", md: "flex-start" }}>
                <Heading size="sm">{fullname}</Heading>
                <Text
                    overflow="hidden"
                    whiteSpace="nowrap"
                    textOverflow="ellipsis"
                    color="gray.600"
                >
                    {role}
                </Text>
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

    return (
        <Grid
            templateColumns={{ base: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
            p={6}
            gap={4}
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
                        key={user.id}
                        fullname={fullname}
                        imgsrc={imgsrc as string}
                        role={role as string}
                        email={email as string}
                    />
                );
            })}
        </Grid>
    );
};
