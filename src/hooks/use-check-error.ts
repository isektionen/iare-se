import { useEffect } from "react";
import { useAlert } from "state/layout";

export const useSanity = (error: boolean) => {
    const alerter = useAlert();

    useEffect(() => {
        if (error) {
            alerter({
                status: "warning",
                title: "No translation found",
                description:
                    "There seems to not exist any version of this page in your selected language",
                isOpen: true,
            });
        }
        return () => {
            alerter("reset");
        };
    }, [alerter, error]);
};
