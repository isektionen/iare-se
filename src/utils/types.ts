import _ from "underscore";

type NonNullable<T> = Exclude<T, null | undefined>;

export const defcast = <T>(maybe: T) => {
    if (_.isUndefined(maybe)) {
        throw new Error("type is undefined");
    }
    return maybe as NonNullable<T>;
};
