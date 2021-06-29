import { MenuListItem } from "./global";

export type LanguageItem = {
    name: string;
    code: "sv" | "en";
};
export interface HeaderProps {
    menuList: MenuListItem[];
    languages: LanguageItem[];
    contact: string;
}
