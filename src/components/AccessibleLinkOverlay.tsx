import {
    Link as ChakraLink,
    LinkBox,
    LinkOverlay,
    LinkBoxProps,
    LinkProps as ChakraLinkProps,
} from "@chakra-ui/layout";
import Link, { LinkProps } from "next/link";

type AccessibleLinkOverlayProps = LinkProps & LinkBoxProps;

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
