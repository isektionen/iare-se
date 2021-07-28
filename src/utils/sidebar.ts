import { HiHome } from "react-icons/hi";
import { MdEvent } from "react-icons/md";
import { RiUserSearchFill } from "react-icons/ri";
import getT from "next-translate/getT";
import { Translate } from "next-translate";

export const getTranslatedRoutes = (t: Translate) => {
    const icons = [HiHome, MdEvent, RiUserSearchFill];
    const routes = t("routes", {}, { returnObjects: true }) as {
        label: string;
        href: string;
    }[];

    return routes.map((r, i) => ({ ...r, icon: icons[i] }));
};
