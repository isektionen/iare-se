import { Deta } from "lib/deta";
import { Strapi } from "lib/strapi";
import { NextRouter, useRouter } from "next/router";
import { DefaultFieldValues } from "pages/event/[slug]";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import useScript from "react-script-hook";
import {
    atom,
    atomFamily,
    RecoilValue,
    selector,
    useRecoilCallback,
    useRecoilValue,
    useRecoilValueLoadable,
} from "recoil";
import _ from "underscore";
interface CheckoutProps {
    checkoutKey: string;
    paymentId?: string;
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
    iFrameId: string;
    send: (event: string, value: any) => void;
    setTheme: (theme: ThemeProps) => void;
    setLanguage: (language: string) => void;
    freezeCheckout: () => void;
    thawCheckout: () => void;
}

interface Nets {
    Checkout: new (config: CheckoutProps) => CheckoutApi;
}

export type IDSTATEParams = "intentionId" | "paymentId" | "fullfillmentId";
interface HandlerOptions {
    get: (param: string) => string | undefined;
    validate: (intentionId: string) => Promise<
        Omit<IDSTATE, "fullfillmentId"> & {
            ticketId: string | undefined;
            consumer: {
                firstName: string;
                lastName: string;
                email: string;
                phoneNumber: string;
                diets: {
                    id: number;
                    name: string;
                }[];
                allergens: {
                    id: number;
                    name: string;
                }[];
            } | null;
            status: "visited" | "pending" | "failed" | "success" | undefined;
        }
    >;
    ticketsAvailable: (eventId: number, maxTickets: number) => Promise<boolean>;
    createIntention: () => Promise<
        Omit<IDSTATE, "fullfillmentId"> & { ticketId: string | undefined }
    >;
}
type HydrateOptions = (
    options: HandlerOptions
) => Promise<Omit<IDSTATE, "fullfillmentId">>;

interface IDSTATE {
    intentionId: string | undefined | null;
    paymentId: string | undefined | null;
    fullfillmentId: string | undefined | null;
}

interface NetsOptions {
    on3DSHandler: (paymentId?: string) => void;
    onCompleteHandler: (response: { paymentId: string }) => void;
    fullfillmentId: string;
    checkoutSrc?: string;
}

export const useQuery = (router: NextRouter) => {
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
        const status =
            atom.intentionId && atom.paymentId
                ? "paid"
                : atom.intentionId && !atom.paymentId
                ? "unpaid"
                : null;
        return {
            status,
            ...atom,
        };
    },
});

export const useNets = ({
    on3DSHandler,
    onCompleteHandler,
    fullfillmentId: _fullfillmentId,
    checkoutSrc = process.env.NEXT_PUBLIC_CHECKOUT_SRC,
}: NetsOptions) => {
    const router = useRouter();
    const [nets, setNets] = useState<Nets | null>(null);
    const [config, setConfig] = useState<CheckoutProps | null>(null);
    const [theme, _setTheme] = useState<ThemeProps | null>(null);
    const [checkout, setCheckout] = useState<CheckoutApi>();
    const [order, setOrder] = useState<{ id: string }>();
    const [iframeId, setIframeId] = useState<string>();
    const [isLoaded, setIsLoaded] = useState(false);

    const query = useQuery(router);

    const [loading, errors] = useScript({
        src: checkoutSrc as string,
        onload: () => {
            setNets(window["Dibs" as any] as unknown as Nets);
        },
    });

    const setCheckoutConfig = useCallback((options: CheckoutProps) => {
        setConfig(options);
    }, []);

    const setTheme = useCallback((options: ThemeProps) => {
        _setTheme(options);
    }, []);

    const hydrateCheckout = useRecoilCallback(
        ({ set }) =>
            async (handler: HydrateOptions) => {
                const get = (param: string) => {
                    if (query.hasOwnProperty(param)) {
                        return query[param] as string;
                    }
                    return undefined;
                };

                const validate = async (_intentionId: string) => {
                    let data = {
                        intentionId: undefined,
                        paymentId: undefined,
                        ticketId: undefined,
                        status: undefined,
                        consumer: null,
                    };
                    const url = Strapi`/orders/${_intentionId}/valid`;
                    const res = await fetch(url, { method: "GET" });

                    if (!res.ok) return data;
                    data = await res.json();

                    return data;
                };

                const ticketsAvailable = async (
                    eventId: number,
                    maxTickets: number
                ) => {
                    const url = Strapi`/orders/count?event=${eventId}&status=success`;
                    const res = await fetch(url, { method: "GET" });

                    if (!res.ok) return false;
                    const data = await res.text();
                    const orders = parseInt(data);
                    return orders < maxTickets;
                };

                const createIntention = async () => {
                    let data = {
                        intentionId: undefined,
                        paymentId: undefined,
                        ticketId: undefined,
                        fullfillmentId: _fullfillmentId,
                    };
                    if (_fullfillmentId) {
                        const url = Deta`/intent/${_fullfillmentId}`;
                        const res = await fetch(url, { method: "POST" });

                        data = await res.json();
                    }
                    return {
                        intentionId: data.intentionId,
                        paymentId: data.paymentId,
                        ticketId: data.ticketId,
                    };
                };

                const { intentionId, paymentId } = await handler({
                    get,
                    validate,
                    ticketsAvailable,
                    createIntention,
                });
                set(stateAtom, {
                    intentionId,
                    paymentId,
                    fullfillmentId: _fullfillmentId,
                });
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

    const withCheckout = useRecoilCallback(
        ({ snapshot }) =>
            <T>(
                callback: (
                    options: IDSTATE & { status: "paid" | "unpaid" | null },
                    order: T
                ) => any
            ) => {
                const { status, intentionId, paymentId, fullfillmentId } =
                    snapshot.getLoadable(validState).contents;

                return (order: T = null as unknown as T) => {
                    if (checkout) checkout.freezeCheckout();

                    let res = null;
                    //setOrder({ id: order as unknown as string });
                    if (status) {
                        res = callback(
                            {
                                status,
                                intentionId,
                                paymentId,
                                fullfillmentId,
                            },
                            order
                        );
                    }
                    if (checkout) checkout.thawCheckout();
                    return res;
                };
            }
    );

    const reset = useCallback(() => {
        setIsLoaded(false);
    }, []);

    const initCheckout = useRecoilCallback(({ snapshot }) => async () => {
        setIframeId("");
        if (!config)
            throw new Error("Need to initiate a config before creation");
        if (!theme) throw new Error("Need to initiate a theme before creation");

        const { status, paymentId } = await snapshot.getPromise(validState);

        if (!status) throw new Error("No valid checkout state");
        // checkout re-renders for every single init
        if (nets && config && !errors && theme) {
            const _config = {
                ...config,
                paymentId: paymentId as string,
            };
            const _checkout = new nets.Checkout(_config);

            setIframeId(_checkout.iFrameId);
            _checkout.setTheme(theme);
            _checkout.on("pay-initialized", (_paymentId) => {
                on3DSHandler(_paymentId);
                _checkout.send("payment-order-finalized", true);
            });
            _checkout.on("payment-completed", (response) => {
                onCompleteHandler(response as unknown as { paymentId: string });
            });
            setCheckout(_checkout);
        }
    });

    useEffect(() => {
        if (iframeId && iframeId !== "") {
            const node = document.getElementById(iframeId);
            if (node) {
                node.addEventListener("load", () =>
                    setTimeout(() => setIsLoaded(true), 1500)
                );
                return () => {
                    node.removeEventListener("load", () => setIsLoaded(false));
                };
            }
        }
    }, [iframeId, isLoaded]);

    const getPaymentId = useRecoilCallback<[], IDSTATE>(
        ({ snapshot }) =>
            () => {
                const loadable = snapshot.getLoadable(stateAtom);
                return loadable.contents ? loadable.contents : undefined;
            }
    );

    return {
        order,
        isLoaded,
        reset,
        initCheckout,
        setCheckoutConfig,
        setCheckout,
        setLanguage,
        setPaymentId,
        getPaymentId,
        hydrateCheckout,
        setTheme,
        withCheckout,
    };
};
