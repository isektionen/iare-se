import { NextImage } from "components/NextImage";
import { useRecoilSSRValue } from "components/RecoilSSR";
import React from "react";
import { useRecoilValue } from "recoil";
import { layout } from "state/layout";
import { DefHeader } from "types/global";

interface Props {
    priority?: boolean;
}

export const Logo = ({ priority }: Props) => {
    const { logo } = useRecoilValue(layout("header"));

    return (
        <NextImage
            src={logo.url}
            width={77}
            height={28}
            alt={logo.alternativeText ?? "Iare logotype"}
            priority={priority}
        />
    );
};
