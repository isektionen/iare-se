import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { Layout } from "state/layout";
import { FooterProps } from "./footer";
import { HeaderProps } from "./header";
import {
    ComponentFooterSocial,
    ComponentHeaderContact,
    ComponentHeaderFeedbackbox,
    ComponentHeaderLanguages,
    ComponentHeaderMenuSection,
    Footer,
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

export type TLocale = string | undefined;

export interface GlobalProps {
    header: HeaderProps;
    footer: FooterProps;
}

export interface DefHeader {
    logo: Pick<UploadFile, "height" | "width" | "url" | "alternativeText">;
    locale: string;
    localizations: Header[];
    sections: ComponentHeaderMenuSection[];
    languages: ComponentHeaderLanguages[];
    contact: ComponentHeaderContact;
    feedbackbox: Pick<ComponentHeaderFeedbackbox, "description"> | null;
}

export type LayoutProps<T> = T &
    Layout & {
        error: boolean;
        localeSlugs?: {
            locale: string;
            slug: string;
        }[];
    };

export interface DefFooter {
    locale: string;
    localizations: Footer[];
    social: ComponentFooterSocial[];
    representative: {
        user: {
            firstname: string;
            lastname: string;
        };
    };
    logo: Pick<UploadFile, "height" | "width" | "url" | "alternativeText">;
}
