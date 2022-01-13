import strapi, { gql, queryLocale } from "lib/strapi";
import { TLocale } from "types/global";
import { Diet, Allergy, Event } from "types/strapi";
import _ from "underscore";

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

const find = async (locale: TLocale, slug: string) => {
    const { data, error } = await queryLocale<{
        events: Event[];
    }>`
        query FindManyDetailedEvents {
            events(locale: ${locale}, where: { slug: ${slug} }) {
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
        error,
    };
};

const event = {
    find,
    findAll,
};

export default event;
