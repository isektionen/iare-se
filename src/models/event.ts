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
    try {
        const res = await strapiInstance.get(`events/${slug}/password`);

        return res.status === 200;
    } catch {
        return false;
    }
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
        query FindGuardedEvent {
            events(locale: ${locale}, where: {slug: ${slug}, password: ${password}}) {
                slug
                
            }
        }
    `;

    return {
        validated: _.first(data.events)?.slug === slug,
        error: error,
    };
};

const findProducts = async (locale: TLocale, slug: string) => {
    const res = await strapiInstance.get(`/events/${slug}/products`);
    if (res.status !== 200) {
        return [];
    }
    return res.data;
};

const findReciept = async (locale: TLocale, reference: string) => {
    if (!reference) {
        return null;
    }
    try {
        const res = await strapiInstance.get(`/orders/${reference}/receipt`);
        if (res.status !== 200) {
            return null;
        }
        return res.data;
    } catch (e) {
        return null;
    }
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
    findProducts,
    findReciept,
};

export default event;
