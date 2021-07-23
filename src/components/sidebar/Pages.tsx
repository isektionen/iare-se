import {
    Center,
    Flex,
    Icon,
    List,
    ListItem,
    ListProps,
    Text,
    useBreakpointValue,
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

    const isMd = useBreakpointValue({ base: false, md: true });
    return (
        <Flex
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
                minW={6}
                minH={6}
                bg={isActive ? "brand.200" : "gray.200"}
                rounded="base"
                mr={{ base: undefined, md: 3 }}
            >
                {icon && <Icon as={icon} />}
            </Center>
            {isMd && <Text>{label}</Text>}
        </Flex>
    );
};

export const Pages = (props: ListProps & Props) => {
    const { routes, ...rest } = props;
    return (
        <List
            spacing={4}
            styleType="none"
            display="table"
            margin="0 auto"
            {...rest}
        >
            {routes.map((route) => (
                <ListItem key={route.label}>
                    <RouteItem {...route} />
                </ListItem>
            ))}
        </List>
    );
};
