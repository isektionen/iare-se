export const aMap = async <T>(
    callback: (value: T, index?: number) => unknown,
    array: T[]
) =>
    Promise.all(
        array.map(async (value, index) => await callback(value, index))
    );
