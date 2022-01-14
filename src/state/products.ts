import { useCallback, useEffect } from "react";
import { atom, selector, useRecoilState, useRecoilValue } from "recoil";
import {
    ComponentEventFormInput,
    ComponentEventFormOption,
    ComponentEventFormSelect,
    ComponentEventFormSwitch,
    Product,
    ProductOption,
    ProductOptionDataDynamicZone,
} from "types/strapi";
import _ from "underscore";
import { defcast } from "utils/types";

type Conform<T, P> = Omit<T, "__typename"> & { __component: P };

type AllFormOptions =
    | Conform<ComponentEventFormInput, "input">
    | Conform<ComponentEventFormSelect, "select">
    | Conform<ComponentEventFormSwitch, "switch">;
type InputOption = {
    type: "input";
    reference: string;
    label: string;
    required: boolean;
    allowMany: boolean;
    description?: string;
};

export type MetaOption = { label: string; value: string };

type SelectOption = {
    type: "select";
    label: string;
    description?: string;
    reference: string;
    required: boolean;
    allowMany: boolean;
    options: MetaOption[];
};

type SwitchOption = {
    type: "switch";
    reference: string;
    label: string;
    required: boolean;
    allowMany: boolean;
    description?: string;
};

export type AllOption = InputOption | SelectOption | SwitchOption;

type ProductStateData = {
    name: string;
    amount: number;
    price: number;
    consumable: boolean;
    available: boolean;
    options: AllOption[];
};

type ProductState = Record<string, ProductStateData>;

const defaultState: ProductState = {};

const _state = atom<ProductState>({
    key: "ATOM/PRODUCTSTATE",
    default: defaultState,
});

/**
 * attachments should exist for each product with options
 */

const mapOptions = (it: ProductStateData, i: null | number = null) => {
    const name = i === null ? it.name : `${it.name} #${i + 1}`;

    return {
        name,
        options: it.options,
        consumable: it.consumable,
    };
};

const attachments = selector({
    key: "SELECTOR/ATTACHMENT",
    get: ({ get }) => {
        const state = get(_state);

        const result = _.pairs(state)
            .filter(
                ([k, v]) => v.available && v.options.length > 0 && v.amount > 0
            )
            .reduce((acc, [k, v]) => {
                if (v.consumable) {
                    return [
                        ...acc,
                        ..._.times(v.amount, (n) => mapOptions(v, n)),
                    ];
                }
                return [...acc, mapOptions(v)];
            }, [] as { name: string; consumable: boolean; options: AllOption[] }[]);
        return result;
    },
});

const component2type: Record<string, "input" | "select" | "switch"> = {
    "event-form.input": "input",
    "event-form.select": "select",
    "event-form.switch": "switch",
};

const clamp = (v: number, min: number, max: number) =>
    Math.max(min, Math.min(max, v));

export const useCheckout = (products: Product[]) => {
    const [state, setState] = useRecoilState(_state);

    const _attachments = useRecoilValue(attachments);

    useEffect(() => {
        const _products = _.chain(products)
            .indexBy("id")
            .mapObject((product) => ({
                name: product.name,
                amount: 0,
                price: product.price,
                consumable: product.consumable || false,
                options: defcast(product.product_options).map((p) => {
                    const optionData = _.first(
                        p?.data as any
                    ) as AllFormOptions;

                    //const type = component2type[optionData.__component]
                    optionData.__component =
                        component2type[optionData.__component];
                    switch (optionData.__component) {
                        case "input":
                            return {
                                type: optionData.__component,
                                reference: `${product.name}::${p?.reference}`,
                                label: optionData.label,
                                description: optionData.description,
                                required: optionData.required,
                                allowMany: p?.allowMany ? true : false,
                            } as InputOption;
                        case "select":
                            return {
                                type: optionData.__component,
                                reference: `${product.name}::${p?.reference}`,
                                label: optionData.label,
                                description: optionData.description,
                                required: optionData.required,
                                allowMany: p?.allowMany ? true : false,
                                options: defcast(
                                    defcast(optionData.meta_option).option
                                ).map((opt) => ({
                                    label: defcast(opt).label,
                                    value: defcast(opt).value,
                                })),
                            } as SelectOption;

                        case "switch":
                            return {
                                type: optionData.__component,
                                reference: `${product.name}::${p?.reference}`,
                                label: optionData.label,
                                description: optionData.description,
                                required: optionData.required,
                                allowMany: p?.allowMany ? true : false,
                            } as SwitchOption;
                    }
                }),
                /* @ts-ignore */
                available: product.available as boolean,
            }))
            .value();
        setState(_products);
    }, []);

    const updateProduct = useCallback(
        (id: string, v: number) => {
            if (_.has(state, id)) {
                setState((s) => ({
                    ...s,
                    [id]: {
                        ...s[id],
                        amount: v,
                    },
                }));
            }
        },
        [setState, state]
    );

    const resetProduct = useCallback(
        (id: string) => {
            if (_.has(state, id)) {
                setState((s) => ({
                    ...s,
                    [id]: {
                        ...s[id],
                        amount: 0,
                    },
                }));
            }
        },
        [setState, state]
    );

    return { updateProduct, attachments: _attachments, resetProduct };
};
