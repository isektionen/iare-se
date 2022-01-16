import { NextImage } from "components/NextImage";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import { useRecoilValue } from "recoil";
import { layout } from "state/layout";

interface Props {
    priority?: boolean;
}

export const Logo = ({ priority }: Props) => {
    const { lang } = useTranslation();
    const { logo } = useRecoilValue(layout({ section: "header", lang }));

    return (
        <NextImage
            src={logo.url}
            width={77}
            height={40}
            alt={logo.alternativeText ?? "Iare logotype"}
            priority={priority}
        />
    );
};
