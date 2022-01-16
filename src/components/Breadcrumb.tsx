import {
    Breadcrumb as BaseBreadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbProps,
} from "@chakra-ui/react";
import React, { useCallback } from "react";
import { LinkComponent } from "./LinkComponent";

interface Props extends BreadcrumbProps {
    path: { label: string; href: string }[];
}

export const Breadcrumb = ({ path, ...props }: Props) => {
    const lastChild = path.length - 1;
    const isLastChild = useCallback(
        (i: number) => {
            return i === lastChild;
        },
        [lastChild]
    );
    return (
        <BaseBreadcrumb>
            {path.map((item, i) => (
                <BreadcrumbItem
                    isCurrentPage={isLastChild(i)}
                    fontWeight={isLastChild(i) ? "bold" : "normal"}
                    key={item.label}
                >
                    {/*<BreadcrumbLink href={item.href} textTransform="capitalize">
                        {item.label}
            </BreadcrumbLink>*/}
                    <LinkComponent href={item.href} textTransform="capitalize">
                        {item.label}
                    </LinkComponent>
                </BreadcrumbItem>
            ))}
        </BaseBreadcrumb>
    );
};
