import strapi, { gql, queryLocale, axios as strapiInstance } from "lib/strapi";
import { TLocale } from "types/global";
import { Diet, Allergy, Event } from "types/strapi";
import _ from "underscore";
import { isBeforeDeadline } from "utils/dates";

const findAll = async () => {
    const { data } = await strapi.query<{ events: Event[] }>({
        query: gql`
            query FindEventSlugs {
                events {
                    slug
                }
            }
        `,
    });
    return { events: data.events };
};

const checkIfGuarded = async (locale: TLocale, slug: string) => {
    const res = await strapiInstance.get(`events/${slug}/password`);
    return res.status === 200;
};

const findGuarded = async (
    locale: TLocale,
    slug: string,
    password: string | null
) => {
    if (!password) {
        return {
            event: null,
            error: true,
        };
    }

    const { data, error } = await queryLocale<{
        events: Event[];
    }>`
        query FindManyDetailedEvents {
            events(locale: ${locale}, where: {slug: ${slug}, password: ${password}}) {
                locale
                title
                slug
                body
                password
                schedule {
                    start
                    deadline
                    end
                }
                location
                media {
                    formats
                    url
                    name
                    width
                    height
                }
                description
            }
        }
    `;

    return {
        event: _.first(data.events),
        error: error,
    };
};

const find = async (locale: TLocale, slug: string) => {
    const { data, error } = await queryLocale<{
        events: Event[];
    }>`
        query FindManyDetailedEvents {
            events(locale: ${locale}, where: {slug: ${slug}}) {
                locale
                title
                slug
                body
                password
                schedule {
                    start
                    deadline
                    end
                }
                location
                media {
                    formats
                    url
                    name
                    width
                    height
                }
                description
            }
        }
    `;

    return {
        event: _.first(data.events),
        error: error,
    };
};

const event = {
    find,
    findAll,
    checkIfGuarded,
    findGuarded,
};

export default event;
