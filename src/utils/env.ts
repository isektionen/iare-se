import _ from "underscore";

export const DEV = () => {
    return process.env.NODE_ENV === "development";
};
