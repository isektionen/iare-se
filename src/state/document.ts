import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import { UploadFile } from "types/strapi";

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
