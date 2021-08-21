import { IconContext } from "react-icons";
import {
    atom,
    selectorFamily,
    useRecoilState,
    useRecoilValue,
    useSetRecoilState,
} from "recoil";
import { ComponentDocumentDocuments, UploadFile } from "types/strapi";

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

//import _ from "underscore";

export const useFilterContext = (docs: ComponentDocumentDocuments[]) => {
    /*const types = _.chain(docs)
        .first()
        .omit("__typename", "id")
        .pairs()
        .reduce((acc, [k, v]) => {
            const t = typeof v;
            if (_.has(acc, t)) {
                return { ...acc, [t]: [...acc[t], k] };
            }
            return { ...acc, [t]: [k] };
        }, {} as { [k: string]: any[] })
        .value();
    console.log(types);
    */

    const filtered = useRecoilValue(filterSelector(docs));
    return filtered;
};
