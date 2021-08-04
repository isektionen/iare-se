import React, { useCallback, useEffect, useRef } from "react";

type Keys = string | string[];
type Handler = (event: KeyboardEvent) => void;

export const useKeypress = (keys: Keys, handler: Handler) => {
    const eventListenerRef = useRef<HTMLDivElement>(null);

    const _handler = useCallback(
        (event: KeyboardEvent) => {
            const _keys = Array.isArray(keys) ? keys : [keys];
            if (_keys.includes(event.key)) {
                handler(event);
            }
        },
        [keys, handler]
    );

    useEffect(() => {
        const node = eventListenerRef.current;
        if (node) {
            node.addEventListener("keydown", _handler);
            return () => {
                node.removeEventListener("keydown", _handler);
            };
        }
    }, [keys, _handler]);

    return eventListenerRef;
};
