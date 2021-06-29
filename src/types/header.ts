import { MenuListItem } from "./global";

export type LanguageItem = {
    name: string;
    code: string;
};
export interface HeaderProps {
    menuList: MenuListItem[];
    languages: LanguageItem[];
    contact: string;
}
