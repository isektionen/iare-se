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
        orderCount: number;
        diets: Diet[];
        allergies: Allergy[];
    }>`
        query FindManyDetailedEvents {
            events(locale: ${locale}, where: { slug: ${slug}}) {
                locale
                fullfillmentUID
                id
                slug
                title
                description
                body
                committee {
                    name
                }
                tickets {
                    Tickets {
                        id
                        swedishName
                        englishName
                        ticketUID
                        price
                    }
                    allowMultiple
                }
                servingOptions {
                    servingFood
                }
                place {
                    name
                }
                maxTickets
                startTime
                endTime
                deadline
                published_at
                passwordProtected {
                    __typename
                }
                localizations {
                    locale
                    slug
                }
            }
            diets {
                id
                name
            }
            allergies {
                id
                name
            }
        }
    `;
    return {
        event: _.first(data.events),
        diets: data.diets,
        allergies: data.allergies,
        error,
    };
};

const event = {
    find,
    findAll,
};

export default event;
