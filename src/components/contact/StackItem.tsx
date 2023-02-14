import {
    Avatar,
    Icon,
    Spacer,
    Tooltip,
    useBreakpointValue,
    Text,
    Button,
} from "@chakra-ui/react";
import { LinkComponent } from "components/LinkComponent";
import useTranslation from "next-translate/useTranslation";
import React, { useMemo } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { Representative, CommitteeFunction } from "types/strapi";
import _ from "underscore";
import { capitalize } from "utils/text";
import { ContactButton } from "./ContactButton";
import { GridTableItem } from "./GridTableItem";

export const StackItem = (representative: Representative) => {
    const { t } = useTranslation("contact");
    const isAboveMd = useBreakpointValue({ base: true, md: false });

    const roles = useMemo(() => {
        const role = _.pluck(
            representative.committee_roles as CommitteeFunction[],
            "role"
        ).map(capitalize);

        const abbreviation = _.pluck(
            representative.committee_roles as CommitteeFunction[],
            "abbreviation"
        ).map((text, i) => {
            if (!text) return role[i];
            return text;
        });

        const href = _.pluck(
            representative.committee_roles as CommitteeFunction[],
            "slug"
        ).map((text) => "/contact/" + text);

        return {
            role,
            abbreviation,
            href,
        };
    }, [representative.committee_roles]);

    const fullName = useMemo(
        () =>
            representative.user?.firstname +
            " " +
            representative.user?.lastname,
        [representative.user?.firstname, representative.user?.lastname]
    );

    const hasMultipleRoles = useMemo(
        () =>
            representative &&
            representative.committee_roles &&
            representative.committee_roles?.length > 1,
        [representative]
    );

    console.log(roles?.role);

    return (
        <>
            <GridTableItem pl={2}>
                <Tooltip label={fullName}>
                    <Avatar
                        name={fullName}
                        rounded="md"
                        size="md"
                        src={representative.cover?.formats.thumbnail}
                    />
                </Tooltip>
            </GridTableItem>
            <GridTableItem
                flexDirection="column"
                alignItems="flex-start"
                justifyContent="center"
            >
                <Text fontWeight="600">{fullName}</Text>
                <Tooltip label={roles.role.join(", ")}>
                    <Text color="gray.600">
                        {roles?.abbreviation.join(", ") ||
                            (roles?.role.join(", ") as string)}
                    </Text>
                </Tooltip>
            </GridTableItem>

            <GridTableItem pr={2}>
                <Spacer />
                {hasMultipleRoles ? (
                    <ContactButton
                        rep={fullName}
                        role={roles.role}
                        href={roles.href}
                    />
                ) : (
                    <LinkComponent
                        as={Button}
                        variant="iareSolid"
                        size="xs"
                        pr={2}
                        href={(_.first(roles.href) as string) || "#"}
                    >
                        {!isAboveMd && t("contact")}
                        <Icon as={IoIosArrowForward} />
                    </LinkComponent>
                )}
            </GridTableItem>
        </>
    );
};
