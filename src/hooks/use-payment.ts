import { CSSProperties } from "@emotion/serialize";
import { useCallback, useEffect, useMemo, useState } from "react";
import useScript from "react-script-hook";
import {
    atom,
    selector,
    useRecoilCallback,
    useRecoilState,
    useRecoilValue,
    useSetRecoilState,
} from "recoil";
import _ from "underscore";
import { defcast } from "utils/types";

type DibsPaymentCompleted = (response: { paymentId: string }) => void;
type DibsPaymentInitialized = (paymentId: string) => void;
type DibsAddressChanged = {
    address: { paymentId: string; countryCode?: string; postalCode?: string };
};
type DibsEvent = {
    "pay-initialized": DibsPaymentInitialized;
    "payment-completed": DibsPaymentCompleted;
    "address-changed": DibsAddressChanged;
};

type DibsSendEvent = "payment-order-finalized";

type DibsAvailableLanguages =
    | "en-GB"
    | "da-DK"
    | "nl-NL"
    | "fi-FI"
    | "fr-FR"
    | "de-DE"
    | "nb-NO"
    | "pl-PL"
    | "es-ES"
    | "sk-SK"
    | "sv-SE";

interface DibsCheckoutConfig {
    checkoutKey?: string;
    paymentId?: string;
    language: DibsAvailableLanguages;
    containerId: string;
    theme?: Partial<DibsThemeConfig>;
}

interface DibsThemeConfig {
    textColor: string;
    primaryColor: string;
    linkColor: string;
    backgroundColor: string;
    fontFamily: string;
    placeholderColor: string;
    outlineColor: string;
    primaryOutlineColor: string;
    panelColor: string;
    panelTextColor: string;
    panelLinkColor: string;
    buttonRadius: number;
    buttonTextColor: string;
    buttonFontWeight: number | "bold" | "normal" | "semibold";
    buttonFontStyle: "italic" | "oblique" | "normal";
    buttonTextTransform: CSSProperties["textTransform"];
    useLightIcons: boolean;
}

interface DibsCheckoutApi {
    on: <T extends keyof DibsEvent>(
        eventName: T,
        handler: DibsEvent[T]
    ) => void;
    //iFrameId: string;
    send: (eventName: DibsSendEvent, value: any) => void;
    setTheme: (theme: Partial<DibsThemeConfig>) => void;
    setLanguage: (language: DibsAvailableLanguages) => void;
    freezeCheckout: () => void;
    thawCheckout: () => void;
    cleanup: () => void;
}

interface DibsInterface {
    Checkout: new (config: DibsCheckoutConfig) => DibsCheckoutApi;
}

const findDibsObject = () => {
    if (window) {
        return _.get(window, "Dibs") as unknown as DibsInterface;
    }
};

interface Props {
    config: DibsCheckoutConfig;
    theme?: Partial<DibsThemeConfig>;
}

const extendConfig = (
    config: DibsCheckoutConfig,
    prop: Record<string, any>
): DibsCheckoutConfig => {
    const _config = { ...config, ...prop };
    return _config;
};

const paymentIdAtom = atom<string | null>({
    key: "ATOM/PAYMENTID",
    default: null,
});

const checkoutAtom = atom<DibsCheckoutApi | null>({
    key: "ATOM/CHECKOUT",
    default: null,
});

export const usePayment = ({ config, theme }: Props) => {
    const [isHydrated, setIsHydrated] = useState<boolean>(false);
    const [checkout, createCheckout] = useState<DibsCheckoutApi | null>(null);

    const [internalConfig, setInternalConfig] = useState<DibsCheckoutConfig>(
        extendConfig(config, {
            theme,
            checkoutKey: defcast(process.env.NEXT_PUBLIC_CHECKOUT_KEY),
        })
    );

    const [internalTheme, setInternalTheme] =
        useState<Partial<DibsThemeConfig> | null>(theme || null);

    const hydrateCheckout = useRecoilCallback(
        ({ set }) =>
            (paymentId: string) => {
                if (isHydrated) {
                    return;
                }
                set(paymentIdAtom, paymentId);
                const maybeDibs = findDibsObject();
                if (maybeDibs) {
                    setIsHydrated(true);
                    createCheckout(
                        new maybeDibs.Checkout(
                            extendConfig(internalConfig, { paymentId })
                        )
                    );
                }
            }
    );

    return {
        hydrateCheckout,
        checkout,
        setIsHydrated,
    };
};
