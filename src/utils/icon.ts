import dynamic, { DynamicOptions, Loader, LoaderComponent } from "next/dynamic";

const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

type IconPack =
    | "ai"
    | "bs"
    | "bi"
    | "di"
    | "fi"
    | "fa"
    | "gi"
    | "ga"
    | "gr"
    | "hi"
    | "im"
    | "io"
    | "io5"
    | "md"
    | "ri"
    | "si"
    | "ti"
    | "vsc"
    | "wi"
    | "cg";

const findIconPack = (icon: string) => {
    // React icon is divied in packages with 2-letter names, except io5 & vsc.
    const _icon = icon.toLowerCase();
    const iconPacks = [
        "ai",
        "bs",
        "bi",
        "di",
        "fi",
        "fa",
        "gi",
        "ga",
        "gr",
        "hi",
        "im",
        "io",
        "io5",
        "md",
        "ri",
        "si",
        "ti",
        "vsc",
        "wi",
        "cg",
    ] as IconPack[];

    const [pack] = iconPacks.filter(
        (ip) =>
            ip.includes(_icon.substring(0, 2)) ||
            ip.includes(_icon.substring(0, 3))
    );
    return {
        iconName: capitalize(pack) + capitalize(_icon.slice(pack.length)),
        iconPack: pack ? pack : undefined,
    };
};

import {
    FaAtlas,
    FaBeer,
    FaCar,
    FaGavel,
    FaMicrophoneAlt,
    FaQuestion,
    FaUniversity,
} from "react-icons/fa";
import { MdGroup, MdColorLens, MdWork } from "react-icons/md";
import { GrWorkshop } from "react-icons/gr";

type Icons =
    | "gavel"
    | "group"
    | "atlas"
    | "colorlens"
    | "car"
    | "question"
    | "university"
    | "microphone"
    | "beer"
    | "work"
    | "workshop";

export const availableIcons = (icon: Icons) => {
    if (icon) {
        const _icon = icon.toLowerCase();

        switch (_icon) {
            case "gavel":
                return FaGavel;
            case "group":
                return MdGroup;
            case "atlas":
                return FaAtlas;
            case "colorlens":
                return MdColorLens;
            case "car":
                return FaCar;
            case "question":
                return FaQuestion;
            case "university":
                return FaUniversity;
            case "microphone":
                return FaMicrophoneAlt;
            case "beer":
                return FaBeer;
            case "work":
                return MdWork;
            case "workshop":
                return GrWorkshop;
        }
    }
};

export const makeIcon = (icon: string) => {
    // this function heavily depends on react-icons
    // doesn't work properly.. DONT USE
    const { iconName, iconPack } = findIconPack(icon);
    if (iconPack) {
        console.log("react-icons/" + iconPack);
        return dynamic(
            () =>
                import(`react-icons/${"fa"}`).then(
                    (mod) => mod[iconName]
                ) as LoaderComponent<{}>
        );
    }
};
