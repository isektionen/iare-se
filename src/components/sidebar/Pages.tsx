import {
    Center,
    Flex,
    Icon,
    List,
    ListItem,
    ListProps,
} from "@chakra-ui/react";
import AccessibleLink from "components/AccessibleLink";
import { useRouter } from "next/router";
import React from "react";
import { IconType } from "react-icons";

export interface Route {
    icon?: IconType;
    href: string;
    label: string;
}

interface Props {
    routes: Route[];
}

const RouteItem = ({ href, icon, label }: Route) => {
    const { pathname } = useRouter();
    //TODO: take care of aktuellt
    const [, parent] = href.split("/");
    const isActive =
        pathname.includes(parent) && (parent !== "" || pathname === "/");
    return (
        <AccessibleLink href={href} passHref>
            <Flex
                as="a"
                align="center"
                fontWeight={isActive ? "bold" : "semibold"}
                color={isActive ? "gray.700" : "gray.500"}
                transitionProperty="colors"
                transitionDuration="0.2s"
                _hover={{
                    color: "gray.700",
                }}
            >
                <Center
                    w={6}
                    h={6}
                    bg={isActive ? "brand.200" : "gray.200"}
                    rounded="base"
                    mr={3}
                >
                    {icon && <Icon as={icon} />}
                </Center>
                {label}
            </Flex>
        </AccessibleLink>
    );
};

export const Pages = (props: ListProps & Props) => {
    const { routes, ...rest } = props;
    return (
        <List spacing={4} styleType="none" {...rest}>
            {routes.map((route) => (
                <ListItem key={route.label}>
                    <RouteItem {...route} />
                </ListItem>
            ))}
        </List>
    );
};
