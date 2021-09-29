import strapi, { gql, queryLocale } from "lib/strapi";
import { TLocale } from "types/global";
import { Jobs } from "types/strapi";
import _ from "underscore";

const find = async (locale: TLocale, slug: string) => {
    const { data, error } = await queryLocale<{ jobs: Jobs[] }>`
    query  {
        jobs(locale: ${locale}, where: {slug: ${slug}}) {
            created_at
            title
            deadlineDate
            startDate
            jobCategory {
                name
            }
            company {
                name
                logo {
                    width
                    height
                    url
                }
                website
            }
            year {
                year
            }
            body
            contact {
                label
                type
                href
            }
            position
            location
            banner {
                url
                width
                height
            }
            localizations {
                locale
                slug
            }
        }
    }`;
    return { job: _.first(data.jobs), error };
};

const findAll = async () => {
    const { data } = await strapi.query<{ jobs: Jobs[] }>({
        query: gql`
            query {
                jobs {
                    slug
                }
            }
        `,
    });
    return { jobs: data.jobs };
};

const job = {
    find,
    findAll,
};

export default job;
