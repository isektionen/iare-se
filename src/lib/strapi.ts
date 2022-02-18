import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import baseAxios from "axios";
import auth from "../../prefetch/static/auth.json";
import _ from "underscore";
const Strapi = (
    path: TemplateStringsArray,
    ...variables: (string | number)[]
) => {
    return (
        process.env.NEXT_PUBLIC_STRAPI +
        path.map((p, i) => p + (variables[i] ? variables[i] : "")).join("")
    );
};
const getUri = () => {
    const base = Strapi`/graphql`;
    return base;
};

const client = new ApolloClient({
    uri: getUri(),
    cache: new InMemoryCache(),
});

const axios = baseAxios.create({
    baseURL: process.env.NEXT_PUBLIC_STRAPI,
    headers: {
        Authorization: `Bearer ${auth.token}`,
    },
});

const strapi = client;

const extractLocales = <T extends { locale: string; slug: string }>(
    data: Record<string, any>,
    extractFrom: string[],
    extract: string[]
) => {
    return extractFrom.reduce((acc, it) => {
        if (_.has(data, it)) {
            const _record = data[it] as Record<string, any[] | any> | null;

            if (
                _record &&
                _.has(_record, "localizations") &&
                _.isArray(_record["localizations"])
            ) {
                return _record["localizations"].map(
                    (locale: Record<string, any>) => {
                        return extract.reduce((acc, __it) => {
                            if (_.has(locale, __it)) {
                                return { ...acc, [__it]: locale[__it] };
                            }
                            return acc;
                        }, {});
                    }
                );
            }
        }
        return acc;
    }, [] as Record<string, any>[]) as T[];
};

const queryLocale = async <T extends object>(
    queryString: TemplateStringsArray,
    ...locale: (string | undefined)[]
) => {
    const defaultLocale = "sv";
    let data: T;
    const _query = async (errors: number[] = []) => {
        const _q = _.zip(queryString, locale)
            .map(([q, l], i) => {
                return (
                    q +
                    (l
                        ? errors.includes(i)
                            ? '"' + defaultLocale + '"'
                            : '"' + l + '"'
                        : "")
                );
            })
            .join("");

        const { data: _data } = await strapi.query({
            query: gql(_q),
        });
        return _data;
    };

    data = await _query();

    const errors: number[] = _.values(data).reduce((acc, it, i) => {
        if (_.isArray(it)) {
            return it.length === 0 ? [...acc, i] : acc;
        }
        return _.isUndefined(it) || _.isNull(it) ? [...acc, i] : acc;
    }, [] as number[]);

    if (errors.length > 0) {
        data = await _query(errors);
    }

    return {
        data: _.mapObject(data, (v, k, i) =>
            _.isUndefined(v) ? null : v
        ) as T,
        error: errors.length > 0,
    };
};

export default strapi;

export { gql, axios, Strapi, queryLocale, extractLocales };
