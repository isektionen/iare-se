import { NextRouter, useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import useScript from "react-script-hook";
import { atom, atomFamily, selector, useRecoilCallback } from "recoil";
import _ from "underscore";
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

export interface CheckoutApi {
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

export type IDSTATEParams = "intentionId" | "paymentId" | "fullfillmentId";
interface HandlerOptions {
    get: (param: IDSTATEParams) => string | undefined;
}
type HydrateOptions = (options: HandlerOptions) => IDSTATE;

interface IDSTATE {
    intentionId: string | undefined;
    paymentId: string | undefined;
    fullfillmentId: string | undefined;
}

interface DibsOptions {
    on3DSHandler: (paymentId?: string) => void;
    onCompleteHandler: (response: { paymentId: string }) => void;
}

const useQuery = (router: NextRouter) => {
    // this uses nextjs router
    const query = router.asPath.split("?")[1];
    if (!query) return {};
    const pairs = query.split(/[;&]/);
    const params = pairs.reduce((params, kv) => {
        const [key, value] = kv.split("=");
        if (key && value) {
            return { ...params, [key]: value };
        }
        return { ...params };
    }, {});
    return params as any;
};

export const useDibs = ({ on3DSHandler, onCompleteHandler }: DibsOptions) => {
    const router = useRouter();
    const [dibs, setDibs] = useState<Dibs | null>(null);
    const [config, setConfig] = useState<CheckoutProps | null>(null);
    const [theme, _setTheme] = useState<ThemeProps | null>(null);
    const [checkout, setCheckout] = useState<CheckoutApi>();
    const query = useQuery(router);

    const stateAtom = atom<IDSTATE>({
        key: "ATOM/IDFAMILY",
        default: {
            intentionId: undefined,
            paymentId: undefined,
            fullfillmentId: undefined,
        },
    });

    const validState = selector({
        key: "SELECTOR/VALIDSTATE",
        get: ({ get }) => {
            const atom = get(stateAtom);
            const validKeys = ["intentionId", "paymentId", "fullfillmentId"];
            const isValid =
                _.chain(atom)
                    .pairs()
                    .reduce((prev, [k, v]) => {
                        return validKeys.includes(k) && v !== undefined ? 1 : 0;
                    }, 0)
                    .value() === validKeys.length;
            return {
                isValid,
                ...atom,
            };
        },
    });

    const [loading, errors] = useScript({
        src: process.env.NEXT_PUBLIC_TEST_CHECKOUT
            ? process.env.NEXT_PUBLIC_TEST_CHECKOUT
            : process.env.NEXT_PUBLIC_CHECKOUT
            ? process.env.NEXT_PUBLIC_CHECKOUT
            : "",
        checkForExisting: true,
        onload: () => {
            setDibs(global.window["Dibs" as any] as unknown as Dibs);
        },
    });

    const checkoutConfig = useCallback((options: CheckoutProps) => {
        setConfig(options);
    }, []);

    const setTheme = useCallback((options: ThemeProps) => {
        _setTheme(options);
    }, []);

    const hydrateCheckout = useRecoilCallback(
        ({ set }) =>
            async (handler: HydrateOptions) => {
                const get = (param: IDSTATEParams) => {
                    if (query.hasOwnProperty(param)) {
                        return query[param];
                    }
                    return null;
                };
                const { intentionId, paymentId, fullfillmentId } = handler({
                    get,
                });
                set(stateAtom, { intentionId, paymentId, fullfillmentId });
            }
    );

    const setPaymentId = useRecoilCallback(
        ({ set }) =>
            async (paymentId: string) => {
                set(stateAtom, (currVal) => ({ ...currVal, paymentId }));
            }
    );

    const setLanguage = useCallback(
        (language: string) => {
            if (checkout) {
                checkout.setLanguage(language);
            }
        },
        [checkout]
    );

    const initCheckout = useRecoilCallback(
        ({ snapshot }) =>
            async () => {
                if (!config)
                    throw new Error(
                        "Need to initiate a config before creation"
                    );
                if (!theme)
                    throw new Error("Need to initiate a theme before creation");

                const { isValid, paymentId } = await snapshot.getPromise(
                    validState
                );

                if (!isValid) throw new Error("No valid checkout state");

                if (dibs && config && !errors && theme && isValid) {
                    const checkout = new dibs.Checkout({
                        ...config,
                        paymentId: paymentId as string,
                    });
                    checkout.setTheme(theme);
                    checkout.on("pay-initialized", (_paymentId) => {
                        on3DSHandler(_paymentId);
                        checkout.send("payment-order-finalized", true);
                    });
                    checkout.on("payment-completed", (response) => {
                        onCompleteHandler(
                            response as unknown as { paymentId: string }
                        );
                    });
                    setCheckout(checkout);
                }
            },
        [config, dibs, errors]
    );
    return {
        initCheckout,
        checkoutConfig,
        setCheckout,
        setLanguage,
        setPaymentId,
        hydrateCheckout,
        setTheme,
    };
};
