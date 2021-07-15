import { FooterProps } from "./footer";
import { HeaderProps } from "./header";
import {
    ComponentFooterSocial,
    ComponentHeaderContact,
    ComponentHeaderLanguages,
    ComponentHeaderLogo,
    ComponentHeaderMenuSection,
    Header,
    UploadFile,
} from "./strapi";

export type ListItemProp = {
    label: string;
    href: string;
};

export type MenuListItem = {
    title: string;
    dropDownMenu: boolean;
    isActive?: boolean;
    onMouseEnter: () => void;
    listItems: ListItemProp[];
};

export interface GlobalProps {
    header: HeaderProps;
    footer: FooterProps;
}

export interface DefHeader {
    logo: Pick<UploadFile, "height" | "width" | "url" | "alternativeText">;
    sections: ComponentHeaderMenuSection[];
    languages: ComponentHeaderLanguages[];
    contact: ComponentHeaderContact;
}

export interface DefFooter {
    social: ComponentFooterSocial[];
    responsiblePublisher: {
        firstname: string;
        lastname: string;
    };
}
