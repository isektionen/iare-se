import React, { useEffect, useRef, useState } from "react";

export const useScrollLock = () => {
    const [lock, setLock] = useState(false);

    useEffect(() => {
        const node = document.body;
        if (!node) return;
        if (lock) {
            node.style.overflow = "hidden";
        }
        if (!lock) {
            node.style.overflow = "";
        }
    }, [lock]);

    return { isLocked: lock, lock: setLock };
};
