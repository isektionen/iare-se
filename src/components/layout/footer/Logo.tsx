import React from "react";
import { NextImage } from "components/NextImage";
import { useRecoilValue } from "recoil";
import { layout } from "state/layout";

interface Props {
    priority?: boolean;
}

export const Logo = ({ priority }: Props) => {
    const { logo } = useRecoilValue(layout("footer"));
    return (
        <NextImage
            src={logo.url}
            width={150}
            height={50}
            alt={logo.alternativeText ?? "Iare footer"}
            priority={priority}
        />
    );
};
