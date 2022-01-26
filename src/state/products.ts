import { NetsCustomer } from "pages/api/checkout/create";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
    atom,
    selector,
    useRecoilCallback,
    useRecoilState,
    useRecoilValue,
} from "recoil";
import {
    ComponentEventFormInput,
    ComponentEventFormSelect,
    ComponentEventFormSwitch,
    Product,
} from "types/strapi";
import _ from "underscore";
import { defcast } from "utils/types";

type GenericCallback = (...args: any[]) => any;

type Conform<T, P> = Omit<T, "__typename"> & { __component: P };

export type AllFormOptions =
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
    name: string;
    reference: string;
    amount: number;
    price: number;
    optionResults: {
        label: string;
        data: (string | MetaOption | boolean | null)[];
        reference: string;
    }[];
};

const defaultFormState: FormState[] = [];

const _state = atom<ProductState>({
    key: "ATOM/PRODUCTSTATE",
    default: defaultState,
});

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
            return [null];
        case "switch":
            return [false];
        case "select":
            return [];
        default:
            return [null];
    }
};

const _formState = selector<FormState[]>({
    key: "SELECTOR/FORMSTATE",
    get: ({ get }) => {
        const attachmentState = get(attachments);
        const state = get(_state);
        const innerState = get(innerFormState);

        return attachmentState.reduce((acc, it) => {
            const stateId = getInnerId(it.id);
            const alreadyExistingOption = innerState.find(
                (p) => p.reference === it.id
            );
            const isConsumable = state[stateId].consumable;
            const amount = state[stateId].amount;

            // poor mans filter
            if (
                alreadyExistingOption &&
                _.has(alreadyExistingOption, "__remove_next")
            ) {
                return [...acc];
            }

            return [
                ...acc,
                {
                    name: it.name,
                    reference: it.id,
                    amount: isConsumable ? clamp(amount, 0, 1) : amount,
                    price: state[stateId].price,
                    optionResults: alreadyExistingOption
                        ? alreadyExistingOption.optionResults
                        : it.options.map((opt) => ({
                              label: opt.label,
                              reference: opt?.reference,
                              data: getDefault(opt?.type),
                          })),
                },
            ];
        }, [] as FormState[]);
    },
    set: ({ set }, newState) => {
        set(innerFormState, newState);
    },
});

const typeMapAtom = atom<Record<string, AllOption["type"]>>({
    key: "ATOM/TYPEMAP",
    default: {},
});

const defaultCustomer = {
    firstName: "N/A",
    lastName: "N/A",
    phone: {
        prefix: "N/A",
        number: "N/A",
    },
    email: "N/A",
};

const customerAtom = atom<NetsCustomer>({
    key: "ATOM/NETSCUSTOMER",
    default: defaultCustomer,
});

const formError = selector({
    key: "SELECTOR/REQUIREDFIELDS",
    get: ({ get }) => {
        const attachmentState = get(attachments);
        const formState = get(_formState);
        const internalState = get(_state);

        const _requiredFields = attachmentState
            .filter((attachment) =>
                attachment.options.some((field) => field?.required)
            )
            .reduce((acc, { id, options }) => {
                const ref = _.last(id.split("::"));
                return [
                    ...acc,
                    ...options
                        .filter((option) => option.required)
                        .map((n) => `${n.reference}::${ref}`),
                ];
            }, [] as string[]);

        const stateContainsItems = _.values(internalState).some(
            (p) => p.amount !== 0
        );
        const formIsEmpty =
            formState.length === 0 && !stateContainsItems
                ? ["form-is-empty"]
                : [];

        const missingFields = formState.reduce((acc, it) => {
            const missing = it.optionResults.reduce(
                (_acc, { data, reference }) => {
                    const id = _.last(it.reference.split("::"));
                    const ref = `${reference}::${id}`;
                    if (_requiredFields.includes(ref) && data.length === 0) {
                        return [..._acc, ref];
                    }
                    return [..._acc];
                },
                [] as string[]
            );
            return [...acc, ...missing];
        }, [] as string[]);

        return [...formIsEmpty, ...missingFields];
    },
});

export const component2type: Record<string, "input" | "select" | "switch"> = {
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

export const getInnerId = (idString: string) => {
    const partialResult = idString.match(/.+::(\d+)::\d+/);
    if (partialResult && partialResult.length === 2) {
        return partialResult[1];
    }
    return idString;
};

const isFalsy = (s?: string) => !s || s.length === 0 || s === "N/A";

const customerError = selector({
    key: "SELECTOR/CUSTOMERERROR",
    get: ({ get }) => {
        const state = get(customerAtom);
        let errors = [];
        if (isFalsy(state.firstName)) errors.push("firstname");
        if (isFalsy(state.lastName)) errors.push("lastname");
        if (isFalsy(state.email)) errors.push("email");
        if (isFalsy(state.phone.number)) errors.push("phone.number");
        if (isFalsy(state.phone.prefix)) errors.push("phone.prefix");

        return errors;
    },
});

export const useSummary = () => {
    const [formState, setFormState] = useRecoilState(_formState);
    const [customer, setCustomer] = useRecoilState(customerAtom);
    const error = useRecoilValue(formError);
    const typeMap = useRecoilValue(typeMapAtom);
    const _customerError = useRecoilValue(customerError);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const getType = useCallback(
        (ref: string) => {
            if (_.has(typeMap, ref)) {
                return typeMap[ref];
            }
        },
        [typeMap]
    );

    const resetProduct = useCallback(
        (ref: string) => {
            setFormState((s) =>
                s.map((p) => {
                    if (p.reference === ref) {
                        return {
                            ...p,
                            __remove_next: true,
                        };
                    }
                    return p;
                })
            );
        },
        [setFormState]
    );

    const updateCustomerData = useCallback(
        (data: Partial<NetsCustomer>) => {
            setIsSubmitting(false);

            //setCustomer((s) => ({ ...s, ...data }));
            setCustomer((s) => ({
                firstName: data.firstName ?? s.firstName,
                lastName: data.lastName ?? s.lastName,
                email: data.email ?? s.email,
                phone: {
                    number: data?.phone?.number ?? s.phone.number,
                    prefix: data?.phone?.prefix ?? s.phone.prefix,
                },
            }));
        },
        [setCustomer]
    );

    const withSubmit = useCallback(
        (cb: any) => () => {
            setIsSubmitting(true);

            if (formState.length > 0 && _customerError.length === 0) {
                cb();
            }
        },
        [_customerError.length, formState.length]
    );

    const hasError = useCallback(
        (name: string) => {
            return _customerError.includes(name) && isSubmitting;
        },
        [_customerError, isSubmitting]
    );

    return {
        formState,
        error,
        getType,
        resetProduct,
        customer,
        updateCustomerData,
        withSubmit,
        hasError,
        isLoading: isSubmitting,
    };
};

export const useCheckout = (products: Product[]) => {
    const [state, setState] = useRecoilState(_state);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formState, setFormState] = useRecoilState(_formState);
    const _attachments = useRecoilValue(attachments);
    const error = useRecoilValue(formError);

    const hydrate = useRecoilCallback(
        ({ set }) =>
            (initialProducts: Product[]) => {
                const _products = _.chain(initialProducts)
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
                                            defcast(optionData.meta_option)
                                                .option
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

                const availableTypes = _.reduce(
                    _products,
                    (acc, it) => {
                        return _.extend(
                            acc,
                            it.options.reduce((_acc, { reference, type }) => {
                                return { ..._acc, [reference]: type };
                            }, {})
                        );
                    },
                    {} as Record<string, AllOption["type"]>
                );
                set(typeMapAtom, availableTypes);
                set(_state, _products);
            }
    );

    useEffect(() => {
        if (state === defaultState) hydrate(products);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [products]);

    useEffect(() => {
        setFormState((s) => s.filter((p) => p.amount !== 0));
    }, [_attachments.length, setFormState]);

    const updateProduct = useCallback(
        (id: string, v: number) => {
            setIsSubmitting(false);
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
            setIsSubmitting(false);
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
            data = data === "" ? null : data;
            setIsSubmitting(false);
            const stateId = getInnerId(id);
            if (_.has(state, stateId)) {
                if (formState.some((s) => s.reference === id)) {
                    return setFormState((s) =>
                        s.map((p) => {
                            if (p.reference === id) {
                                if (p.optionResults.length === 0) {
                                    const _option = state[stateId].options.find(
                                        (pref) => pref.reference === ref
                                    );
                                    return {
                                        ...p,
                                        amount: state[stateId].consumable
                                            ? 1
                                            : p.amount,
                                        optionResults: toList({
                                            label:
                                                _option?.label ?? "undefined",
                                            data: toList(data),
                                            reference: ref,
                                        }),
                                    };
                                }

                                return {
                                    ...p,
                                    amount: state[stateId].consumable
                                        ? 1
                                        : p.amount,
                                    optionResults: p.optionResults.reduce(
                                        (acc, it) => {
                                            if (it.reference === ref) {
                                                return [
                                                    ...acc,
                                                    {
                                                        label: it.label,
                                                        data: toList(data),
                                                        reference: it.reference,
                                                    },
                                                ];
                                            }
                                            return [...acc, it];
                                        },
                                        [] as {
                                            label: string;
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

    const hasError = useCallback(
        (ref: string) => {
            if (error.length > 0 && error.includes(ref) && isSubmitting) {
                return true;
            }
            return false;
        },
        [error, isSubmitting]
    );

    const withSubmit = useCallback(
        (cb: GenericCallback) => (args: any | any[]) => {
            const stateContainsItems = _.values(state).some(
                (p) => p.amount !== 0
            );
            setIsSubmitting(true);
            if (
                error.filter((p) => p !== "form-is-empty").length === 0 &&
                (formState.length > 0 || stateContainsItems)
            ) {
                cb(formState);
            }
        },
        [error, formState, state]
    );

    return {
        internalState: state,
        updateProduct,
        attachments: _attachments,
        resetProduct,
        formState,
        appendData,
        getFormData,
        error,
        withSubmit,
        hasError,
    };
};
