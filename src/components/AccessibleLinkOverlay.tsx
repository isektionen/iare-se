import {
    Link as ChakraLink,
    LinkBox,
    LinkOverlay,
    LinkBoxProps,
    LinkProps as ChakraLinkProps,
} from "@chakra-ui/layout";
import { LinkOverlayProps } from "@chakra-ui/react";
import Link, { LinkProps } from "next/link";

type AccessibleLinkOverlayProps = LinkProps & LinkOverlayProps;

const AccessibleLinkOverlay = ({
    href,
    children,
    isExternal,
    as,
}: AccessibleLinkOverlayProps) => {
    return (
        <LinkBox as={as} w="full" h="full">
            <Link href={href} passHref>
                <LinkOverlay isExternal={isExternal}>{children}</LinkOverlay>
            </Link>
        </LinkBox>
    );
};

export default AccessibleLinkOverlay;
