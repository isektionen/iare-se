import { Flex, Icon, IconButton } from "@chakra-ui/react";
import AccessibleLink from "components/AccessibleLink";
import React from "react";
import {
    FaFacebook,
    FaLinkedinIn,
    FaInstagram,
    FaDiscord,
} from "react-icons/fa";
import { ComponentFooterSocial } from "types/strapi";

const getSocial = ({ type }: ComponentFooterSocial) => {
    switch (type) {
        case "FACEBOOK":
            return { icon: <FaFacebook />, "aria-label": "Visit Facebook" };
        case "INSTAGRAM":
            return { icon: <FaInstagram />, "aria-label": "Visit Instagram" };
        case "LINKEDIN":
            return { icon: <FaLinkedinIn />, "aria-label": "Visit LinkedIn" };
        case "DISCORD":
            return { icon: <FaDiscord />, "aria-label": "Visit Discord" };
        default:
            return { icon: <></>, "aria-label": "Not found" };
    }
};

interface Props {
    socials: ComponentFooterSocial[];
}

export const Social = (props: Props) => {
    return (
        <Flex
            alignSelf={{ base: "inherit", lg: "flex-end" }}
            pt={{ base: 8, lg: 0 }}
        >
            {props.socials &&
                props.socials.map((social) => {
                    const iconProps = getSocial(social);
                    return (
                        <AccessibleLink
                            key={social.id}
                            href={social?.href ?? "#"}
                        >
                            <IconButton
                                fontSize="3xl"
                                variant="ghost"
                                {...iconProps}
                            />
                        </AccessibleLink>
                    );
                })}
        </Flex>
    );
};
