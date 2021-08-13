import { NextImage } from "components/NextImage";
import React from "react";
import { DefHeader } from "types/global";

export const Logo = ({ logo }: Pick<DefHeader, "logo">) => (
    <NextImage
        src={logo.url}
        width={77}
        height={28}
        alt={logo.alternativeText ?? "Iare logotype"}
        priority
    />
);
