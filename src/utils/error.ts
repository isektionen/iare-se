import _ from "underscore";

export const checkForError = (objects: Record<string, any>) => {
    const error = _.values(objects).some((item) => {
        if (_.isArray(item)) {
            return item.length === 0;
        }
        return _.isUndefined(item) || _.isNull(item);
    });
    const result = {
        error,
        ..._.mapObject(objects, (v) => {
            return _.isUndefined(v) ? null : v;
        }),
    };
    return result;
};

export const DEV = () => {
    return process.env.NODE_ENV === "development";
};
