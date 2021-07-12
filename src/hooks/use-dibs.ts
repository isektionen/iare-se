import React, { useState } from "react";
import useScript from "react-script-hook";

interface CheckoutProps {
    checkoutKey: string;
    paymentId: string;
    language: string;
    containerId: string;
}

interface ThemeProps {
    textColor: string;
    primaryColor: string;
    linkColor: string;
    backgroundColor: string;
    fontFamily: string;
    placeholderColor: string;
    outlineColor: string;
    primaryOutlineColor: string;
}

interface CheckoutApi {
    on: (event: string, callback: (paymentId?: string) => void) => void;
    send: (event: string, value: any) => void;
    setTheme: (theme: ThemeProps) => void;
    setLanguage: (language: string) => void;
    freezeCheckout: () => void;
    thawCheckout: () => void;
}

interface Dibs {
    Checkout: new (config: CheckoutProps) => CheckoutApi;
}

export const useDibs = () => {
    const [dibs, setDibs] = useState<Dibs | null>(null);
    const [loading, error] = useScript({
        src: process.env.NEXT_PUBLIC_TEST_CHECKOUT
            ? process.env.NEXT_PUBLIC_TEST_CHECKOUT
            : process.env.NEXT_PUBLIC_CHECKOUT
            ? process.env.NEXT_PUBLIC_CHECKOUT
            : "",
        checkForExisting: true,
        onload: () => {
            setDibs(window["Dibs" as any] as unknown as Dibs);
        },
    });
    return dibs;
};
