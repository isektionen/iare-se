import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { Layout } from "state/layout";
import { FooterProps } from "./footer";
import { HeaderProps } from "./header";
import {
    ComponentFooterSocial,
    ComponentHeaderContact,
    ComponentHeaderFeedbackbox,
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
    locale: string;
    localizations: Omit<DefHeader, "localizations">[];
    sections: ComponentHeaderMenuSection[];
    languages: ComponentHeaderLanguages[];
    contact: ComponentHeaderContact;
    feedbackbox: Pick<ComponentHeaderFeedbackbox, "description"> | null;
}

export type LayoutProps<T> = T & Layout;

export interface DefFooter {
    locale: string;
    localizations: Omit<DefFooter, "localizations">[];
    social: ComponentFooterSocial[];
    responsiblePublisher: {
        firstname: string;
        lastname: string;
    };
    logo: Pick<UploadFile, "height" | "width" | "url" | "alternativeText">;
}
