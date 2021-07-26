import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import _ from "underscore";
type Props<T> = () => T[];

const isClient = typeof window !== "undefined";

const toLowerCase = (obj: { [k: string]: any }) => {
    const [key] = Object.keys(obj);
    const lowerCaseKey = key.toLowerCase();
    const value = obj[key];
    const lowerCaseValue = _.isArray(value)
        ? _.invoke(value, "toLowerCase")
        : value
        ? value.toLowerCase()
        : value;
    return _.zip([lowerCaseKey], [lowerCaseValue]).reduce(
        (acc, [key, value]) => ({ ...acc, [key]: value }),
        {}
    );
};

const where = (coll: any[], query: { [k: string]: any }) => {
    const keys = Object.keys(query);
    return coll.filter((c) =>
        keys.some((k) => {
            if (_.isArray(c[k])) {
                return c[k].includes(query[k]);
            }
            return c[k] === query[k];
        })
    );
};

export const useSearch = <T extends object>(
    setCollection: Props<T>,
    searchTermMap: (item: T) => { [k: string]: any }
) => {
    const collection = setCollection()
        .map(searchTermMap)
        .reduce(
            (acc: { [k: string]: any }[], coll, i) => [
                ...acc,
                { ...toLowerCase(coll), __sid: i },
            ],
            [] as any[]
        );
    const router = useRouter();
    const [result, setResult] = useState(_.pluck(collection, "__sid"));

    const setQuery = (query: { [k: string]: string | number }) => {
        const newQuery = { ...router.query, ...query };
        if (isClient && router) router.push({ query: toLowerCase(newQuery) });
    };

    const clearQuery = () => {
        const res = _.pluck(collection, "__sid");
        setResult(res);
        router.push({ query: {} });
    };

    useEffect(() => {
        if (isClient && router && !_.isEmpty(router.query)) {
            const query = toLowerCase(router.query);
            setResult(_.pluck(where(collection, query), "__sid"));
        }
    }, [router.query]);

    const filter = useCallback(
        (coll: T[]) => result.map((i) => coll[i]),
        [result]
    );

    return { filter, setQuery, clearQuery, query: router.query };
};
