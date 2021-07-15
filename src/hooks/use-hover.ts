import React, {
    createRef,
    RefObject,
    useEffect,
    useRef,
    useState,
} from "react";

interface Props {
    onOver?: () => void;
    onOut?: () => void;
}

export const useHover = <T extends HTMLElement>(props: Props) => {
    const [hovering, setHovering] = useState(false);

    const ref = createRef<T>();

    const handleMouseOver = () => {
        setHovering(true);
        if (props.onOver) props.onOver();
    };
    const handleMouseOut = () => {
        setHovering(false);
        if (props.onOut) props.onOut();
    };

    useEffect(() => {
        const node = ref.current;
        if (node) {
            node.addEventListener("mouseover", handleMouseOver);
            node.addEventListener("mouseout", handleMouseOut);
            return () => {
                node.removeEventListener("mouseover", handleMouseOver);
                node.removeEventListener("mouseout", handleMouseOut);
            };
        }
    }, [ref]);

    return [ref, hovering] as [RefObject<T>, boolean];
};
