import { useCallback, useEffect } from "react";
import { atom, selector, useRecoilState, useRecoilValue } from "recoil";
import { Product } from "types/strapi";
import _ from "underscore";

type InputOption = {
    type: "input";
    reference: string;
    label: string;
    required: boolean;
    allowMany: boolean;
    description: string;
};

type SelectOption = {
    type: "select";
    label: string;
    description: string;
    reference: string;
    required: boolean;
    allowMany: boolean;
    options: { label: string; value: string }[];
};

export type AllOption = InputOption | SelectOption;

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
    };
};

const attachments = selector({
    key: "SELECTOR/ATTACHMENT",
    get: ({ get }) => {
        const state = get(_state);
        const result = _.values(state)
            .filter((p) => p.available && p.options.length > 0 && p.amount > 0)
            .reduce((acc, it) => {
                if (it.consumable) {
                    return [
                        ...acc,
                        ..._.times(it.amount, (i) => mapOptions(it, i)),
                    ];
                }
                return [...acc, mapOptions(it)];
            }, [] as { name: string; options: AllOption[] }[]);
        return result;
    },
});

const component2type: Record<string, string> = {
    "event-form.input": "input",
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
                options:
                    product.product_options?.map((p) => {
                        const optionData = _.first(p?.data as any);
                        return {
                            type: component2type[
                                optionData["__component"]
                            ] as "input",
                            reference: `${product.name}::${p?.reference}`,
                            label: optionData.label as string,
                            required: optionData.required as boolean,
                            description: optionData.description as string,
                            allowMany: p?.allowMany as boolean,
                        };
                    }) || ([] as AllOption[]),
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
