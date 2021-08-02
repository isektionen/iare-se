import {
    Link as ChakraLink,
    LinkProps as ChakraLinkProps,
    Box,
} from "@chakra-ui/react";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";

type AccessibleLinkProps = LinkProps &
    ChakraLinkProps & { afterClick?: () => void };

const AccessibleLink = ({
    href,
    isExternal,
    children,
    as,
    afterClick,
    ...rest
}: AccessibleLinkProps) => {
    const router = useRouter();
    const handleAfterClick = () => {
        if (afterClick) afterClick();
        router.push(href);
    };
    return (
        <>
            {afterClick && !isExternal ? (
                <Box onClick={handleAfterClick} cursor="pointer">
                    {children}
                </Box>
            ) : !afterClick && !isExternal ? (
                <Link href={href} as={as} passHref>
                    <ChakraLink isExternal={isExternal} {...rest}>
                        {children}
                    </ChakraLink>
                </Link>
            ) : (
                <ChakraLink isExternal={isExternal} href={href} {...rest}>
                    {children}
                </ChakraLink>
            )}
        </>
    );
};

export default AccessibleLink;
