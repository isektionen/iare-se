import { Box, Flex, Icon, IconButton } from "@chakra-ui/react";
import AccessibleLink from "components/AccessibleLink";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import {
    FaFacebook,
    FaLinkedinIn,
    FaInstagram,
    FaDiscord,
} from "react-icons/fa";
import { useRecoilValue } from "recoil";
import { layout } from "state/layout";
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

export const Social = () => {
    const { lang } = useTranslation();
    const { social } = useRecoilValue(layout({ section: "footer", lang }));
    return (
        <Box>
            {social &&
                social.map((item) => {
                    const iconProps = getSocial(item);
                    return (
                        <AccessibleLink key={item.id} href={item?.href ?? "#"}>
                            <IconButton
                                fontSize="3xl"
                                variant="ghost"
                                {...iconProps}
                            />
                        </AccessibleLink>
                    );
                })}
        </Box>
    );
};
