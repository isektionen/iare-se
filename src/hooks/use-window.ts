import React, { useEffect, useState } from "react";

interface Dimensions {
    width: number;
    height: number;
}

export const useWindow = (ssr: boolean = true) => {
    const [dimensions, setDimensions] = useState<Dimensions>({
        width: 0,
        height: 0,
    });

    const handleResize = () =>
        setDimensions({
            width: window.innerWidth,
            height: window.innerHeight,
        });

    useEffect(() => {
        handleResize();
        ssr && window && window.addEventListener("resize", handleResize);
        return () => {
            if (ssr) window.removeEventListener("resize", handleResize);
        };
    }, []);

    return dimensions;
};
