import { FooterProps } from "./footer";
import { HeaderProps } from "./header";

export type ListItemProp = {
    name: string;
    href: string;
};

export type MenuListItem = {
    title: string;
    dropDownMenu: boolean;
    listItems: ListItemProp[];
};

export interface GlobalProps {
    header: HeaderProps;
    footer: FooterProps;
}
