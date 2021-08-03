import React, { useCallback, useEffect, useState } from "react";

export const useLogIntercept = (text: string) => {
    const [oldConsole, setOldConsole] = useState(console);
    const [intercepted, _setIntercepted] = useState(false);

    const setIntercepted = useCallback(
        (bool: boolean) => setTimeout(() => _setIntercepted(bool), 3500),
        []
    );
    useEffect(() => {
        if (window) {
            console.log("intercepting console");
            setOldConsole(window.console);
            window.console.log = (message) => {
                if (message === text) {
                    setIntercepted(true);
                }
                oldConsole.warn(message);
            };
            return () => {
                window.console = oldConsole;
            };
        }
    }, []);
    return intercepted;
};
