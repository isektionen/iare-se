import _ from "underscore";

type NonNullable<T> = Exclude<T, null | undefined>;

export const defcast = <T>(maybe: T) => {
    return maybe as NonNullable<T>;
};
