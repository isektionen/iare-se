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

export type FormState = {
    reference: string;
    amount: number;
    price: number;
    optionResults: {
        data: (string | MetaOption | boolean)[];
        reference: string;
    }[];
};

const defaultFormState: FormState[] = [];

const _state = atom<ProductState>({
    key: "ATOM/PRODUCTSTATE",
    default: defaultState,
});

/*
const _formState = atom<FormState[]>({
    key: "ATOM/FORMSTATE",
    default: defaultFormState,
});
*/

const mapOptions = (
    it: ProductStateData,
    id: string,
    i: null | number = null
) => {
    const name = i === null ? it.name : `${it.name} #${i + 1}`;
    const id_ref = i === null ? id : `${it.name}::${id}::${i + 1}`;

    return {
        id: id_ref,
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
                        ..._.times(v.amount, (n) => mapOptions(v, k, n)),
                    ];
                }
                return [...acc, mapOptions(v, k)];
            }, [] as { id: string; name: string; consumable: boolean; options: AllOption[] }[]);

        return result;
    },
});

const innerFormState = atom<FormState[]>({
    key: "ATOM/FORMSTATE",
    default: defaultFormState,
});

const getDefault = (t: AllOption["type"]) => {
    switch (t) {
        case "input":
            return [];
        case "switch":
            return [false];
        case "select":
            return [];
    }
};

const _formState = selector<FormState[]>({
    key: "SELECTOR/FORMSTATE",
    get: ({ get }) => {
        const attachmentState = get(attachments);
        const state = get(_state);
        const innerState = get(innerFormState);

        return attachmentState.map((s) => {
            const stateId = getInnerId(s.id);
            const alreadyExistingOption = innerState.find(
                (p) => p.reference === s.id
            );
            return {
                reference: s.id,
                amount: state[stateId].amount,
                price: state[stateId].price,
                optionResults: alreadyExistingOption
                    ? alreadyExistingOption.optionResults
                    : s.options.map((opt) => ({
                          reference: opt.reference,
                          data: getDefault(opt.type),
                      })),
            };
        });
    },
    set: ({ set }, newState) => {
        set(innerFormState, newState);
    },
});

const component2type: Record<string, "input" | "select" | "switch"> = {
    "event-form.input": "input",
    "event-form.select": "select",
    "event-form.switch": "switch",
};

const clamp = (v: number, min: number, max: number) =>
    Math.max(min, Math.min(max, v));

const toList = <T>(items: T[] | T) => {
    if (_.isArray(items)) {
        return items;
    }
    return [items];
};

const getInnerId = (idString: string) => {
    const partialResult = idString.match(/.+::(\d+)::\d+/);
    if (partialResult && partialResult.length === 2) {
        return partialResult[1];
    }
    return idString;
};

export const useCheckout = (products: Product[]) => {
    const [state, setState] = useRecoilState(_state);

    const [formState, setFormState] = useRecoilState(_formState);
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setFormState((s) => s.filter((p) => p.amount !== 0));
    }, [_attachments.length, setFormState]);

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

    const appendData = useCallback(
        (id: string, ref: string, data: any = []) => {
            const stateId = getInnerId(id);
            if (_.has(state, stateId)) {
                if (formState.some((s) => s.reference === id)) {
                    return setFormState((s) =>
                        s.map((p) => {
                            if (p.reference === id) {
                                if (p.optionResults.length === 0) {
                                    return {
                                        ...p,
                                        optionResults: toList({
                                            data: toList(data),
                                            reference: ref,
                                        }),
                                    };
                                }

                                return {
                                    ...p,
                                    optionResults: p.optionResults.reduce(
                                        (acc, it) => {
                                            if (it.reference === ref) {
                                                return [
                                                    ...acc,
                                                    {
                                                        data: toList(data),
                                                        reference: it.reference,
                                                    },
                                                ];
                                            }
                                            return [...acc, it];
                                        },
                                        [] as {
                                            data: (string | MetaOption)[];
                                            reference: string;
                                        }[]
                                    ),
                                };
                            }
                            return p;
                        })
                    );
                }
                setFormState((s) => [
                    ...s,
                    {
                        reference: id,
                        amount: state[stateId].amount,
                        price: state[stateId].price,
                        optionResults: [
                            {
                                data: toList(data),
                                reference: ref,
                            },
                        ],
                    },
                ]);
            }
        },
        [formState, setFormState, state]
    );

    const getFormData = useCallback(
        (id: string, ref: string) => {
            const result = formState
                .find((s) => s.reference === id)
                ?.optionResults.find((s) => s.reference === ref);
            return result;
        },
        [formState]
    );

    return {
        updateProduct,
        attachments: _attachments,
        resetProduct,
        formState,
        appendData,
        getFormData,
    };
};
