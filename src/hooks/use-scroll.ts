import React, { useCallback, useEffect } from "react";

interface Props {
    behavior?: "smooth" | "auto";
    block?: "start" | "center" | "end" | "nearest";
    inline?: "start" | "center" | "end" | "nearest";
}

export const useScroll = <T extends HTMLElement>({
    behavior = "auto",
    block = "start",
    inline = "nearest",
}: Props) => {
    const ref = React.useRef<T>(null);

    const scrollTo = useCallback(() => {
        if (ref.current) {
            const node = ref.current;
            node.scrollIntoView({
                behavior,
                block,
                inline,
            });
        }
    }, [behavior, block, inline]);

    return { ref, scrollTo };
};
