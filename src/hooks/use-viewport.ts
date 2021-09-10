import React, { useEffect, useState } from "react";

export const useViewport = (updateOnResize = true) => {
    const [vw, setVW] = useState<number>();
    const [vh, setVH] = useState<number>();

    useEffect(() => {
        const setSizes = () => {
            if (window.innerWidth !== vw) {
                setVW(window.innerWidth);
            }

            if (window.innerHeight !== vh) {
                setVH(window.innerHeight);
            }
        };

        setSizes();

        if (updateOnResize) {
            window.addEventListener("resize", setSizes);

            return () => window.removeEventListener("resize", setSizes);
        }
    }, [updateOnResize, vh, vw]);
    return { vw, vh };
};
