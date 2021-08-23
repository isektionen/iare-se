import { SelectOption } from "components/document/SearchBar";
import { isWithinInterval, subDays } from "date-fns";
import addDays from "date-fns/addDays";
import Fuse from "fuse.js";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { IconContext } from "react-icons";
import {
    atom,
    atomFamily,
    selector,
    selectorFamily,
    useRecoilState,
    useRecoilValue,
    useSetRecoilState,
} from "recoil";
import { ComponentDocumentDocuments, UploadFile } from "types/strapi";
import _ from "underscore";
import { useDatepickerState } from "./datepicker";

interface IDocument {
    file: null | string;
    title: null | string;
    isOpen: boolean;
}

const documentState = atom<IDocument>({
    key: "ATOM/DOCUMENT",
    default: {
        file: null,
        title: null,
        isOpen: false,
    },
});

export const useDocument = () => {
    const setDocument = useSetRecoilState(documentState);

    return ({ file, title }: Omit<IDocument, "isOpen">) => {
        setDocument({ file, title, isOpen: true });
    };
};

export const useDocumentContext = () => {
    const setDocument = useSetRecoilState(documentState);
    const doc = useRecoilValue(documentState);
    return {
        onClose: () => setDocument({ file: null, title: null, isOpen: false }),
        title: doc.title,
        file: doc.file,
        isOpen: doc.isOpen,
    };
};

type ContentType = "boolean" | "datetime" | "string";
interface IFilter {
    id: string;
    icon?: IconContext;
    title: string;
    contentType: ContentType;
    boundary: (item: ComponentDocumentDocuments) => boolean;
    onRemove: () => void;
}

export type Action =
    | { type: "remove"; id: string }
    | {
          type: "add";
          id: string;
          icon?: IconContext;
          title: string;
          contentType: ContentType;
          boundary: (item: ComponentDocumentDocuments) => boolean;
      };

const filterState = atom<IFilter[]>({
    key: "ATOM/FILTER",
    default: [],
});

export const useFilter = () => {
    const [state, setFilter] = useRecoilState(filterState);

    const dispatch = (action: Action) => {
        switch (action.type) {
            case "remove":
                setFilter((val) => val.filter((v) => v.id !== action.id));
                break;
            case "add":
                if (!state.find((p) => p.id === action.id)) {
                    const { type, ...rest } = action;
                    setFilter((val) => [
                        ...val,
                        {
                            ...rest,
                            onRemove: () =>
                                dispatch({
                                    type: "remove",
                                    id: action.id,
                                }),
                        },
                    ]);
                }
                break;
        }
    };

    return {
        dispatch,
        state,
    };
};

const filterSelector = selectorFamily({
    key: "SELECTOR/FILTER",
    get:
        (docs: ComponentDocumentDocuments[]) =>
        ({ get }) => {
            const filters = get(filterState);
            if (filters.length > 0) {
                return filters.flatMap((f) =>
                    docs.filter((d) => {
                        if (f.boundary) {
                            const res = f.boundary(d);
                            return res;
                        }
                        return true;
                    })
                );
            }
            return docs;
        },
});

export const useFilterContext = (docs: ComponentDocumentDocuments[]) => {
    const filtered = useRecoilValue(filterSelector(docs));
    return filtered;
};

interface IFuseState {
    searchTerm: string | null;
}

const fuseState = atom<IFuseState>({
    key: "ATOM/FUSE",
    default: {
        searchTerm: null,
    },
});

export interface QueryState {
    category: null | SelectOption[];
    businessYear: null | SelectOption[];
}

const queryState = atom<QueryState>({
    key: "ATOMFAM/SELECT",
    default: {
        category: null,
        businessYear: null,
    },
});

const selectFuse = selector({
    key: "SELECTOR/FUSE",
    get: ({ get }) => {
        const { searchTerm } = get(fuseState);
        return searchTerm;
    },
});

export const useFuseRegister = () => {
    const setSearchTerm = useSetRecoilState(fuseState);

    const inputRef = useRef<HTMLInputElement>(null);
    const register = {
        ref: inputRef,
        onChange: useCallback(() => {
            if (!inputRef.current) return;
            const node = inputRef.current;
            const searchTerm = node.value;
            setSearchTerm((state) => ({ ...state, searchTerm }));
        }, [setSearchTerm]),
    };

    const [options, setOptions] = useRecoilState(queryState);

    const useSelection = useCallback(() => {
        return {
            options,
            setOptions:
                (key: keyof typeof options) => (options: SelectOption[]) =>
                    setOptions((_state) => ({
                        ..._state,
                        [key]: options,
                    })),
        };
    }, [options, setOptions]);
    return { register, useSelection };
};

export const useFuseFilter = (docs: ComponentDocumentDocuments[]) => {
    let data = docs;

    const searchTerm = useRecoilValue(selectFuse);
    const { startDate, endDate } = useDatepickerState();
    const [{ category, businessYear }, setQueryParams] =
        useRecoilState(queryState);

    const applyFilter = (data: ComponentDocumentDocuments[]) => {
        let _data = data;
        if (category) {
            const filters = category
                .filter((item) => item.isSelected)
                .map((item) => item.value);
            if (filters.length > 0) {
                _data = _data.filter((item) =>
                    filters.includes(item.category?.name as string)
                );
            }
        }

        if (businessYear) {
            const filters = businessYear
                .filter((item) => item.isSelected)
                .map((item) => item.value);
            if (filters.length > 0) {
                _data = _data.filter((item) =>
                    filters.includes(item.businessYear as string)
                );
            }
        }
        if (startDate && endDate) {
            _data = _data.filter((item) =>
                isWithinInterval(new Date(item.date), {
                    start: subDays(startDate, 1),
                    end: addDays(endDate, 1),
                })
            );
        }
        return _data;
    };

    useEffect(() => {
        const category = data
            .map((item) => ({
                isSelected: false,
                label: item.category?.name,
                value: item.category?.name,
            }))
            .filter((item) => item.label !== undefined) as SelectOption[];

        const businessYear = data.map((item) => ({
            isSelected: false,
            label: item.businessYear,
            value: item.businessYear,
        })) as SelectOption[];

        setQueryParams({
            category: _.unique(category, "value"),
            businessYear: _.unique(businessYear, "value"),
        });
    }, [data, setQueryParams]);

    const fuse = useMemo(
        () =>
            new Fuse(data, {
                keys: ["name", "category.name", "businessYear"],
            }),
        [data]
    );

    if (searchTerm) {
        const result = fuse.search(searchTerm);
        return applyFilter(result.map((r) => r.item));
    }

    return applyFilter(data);
};
