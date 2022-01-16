import gql from "graphql-tag";
import strapi from "lib/strapi";
import { TLocale } from "types/global";
import { Jobs, Post, Event } from "types/strapi";
import _ from "underscore";

const getAuthor = (item: Event | Post | Jobs) => {
    switch (item.__typename) {
        case "Event":
            return item?.committee?.name ?? "N/A";
        case "Post":
            return item?.committee?.name ?? "N/A";
        case "Jobs":
            return item?.company?.name ?? "N/A";
        default:
            return null;
    }
};

const getHref = (item: Event | Post | Jobs) => {
    switch (item.__typename) {
        case "Event":
            return "/event/" + item.slug;
        case "Post":
            return "/blog/" + item.slug;
        case "Jobs":
            return "/job/" + item.slug;
        default:
            return null;
    }
};

const getDateTime = (item: Event | Post | Jobs) => {
    switch (item.__typename) {
        case "Event":
            return item.schedule?.start;
        case "Post":
            return item.published_at;
        case "Jobs":
            return item.deadlineDate;
        default:
            return null;
    }
};

const getCategories = (item: Event | Post | Jobs) => {
    switch (item.__typename) {
        case "Event":
            return [item?.category?.name].filter((_item) => _item);
        case "Post":
            return item?.categories
                ?.map((i) => i?.name)
                .filter((_item) => _item);
        case "Jobs":
            return [item?.jobCategory?.name].filter((_item) => _item);
        default:
            return null;
    }
};

const getBody = (item: Event | Post | Jobs) => {
    switch (item.__typename) {
        case "Event":
            return item?.description ?? "";
        case "Post":
            return item?.body ?? "";
        case "Jobs":
            return item?.body ?? "";
        default:
            return "";
    }
};

const post = {
    findAll: async (locale: TLocale) => {
        const {
            data: { posts, events, jobs },
        } = await strapi.query<{
            posts: Post[];
            events: Event[];
            jobs: Jobs[];
        }>({
            query: gql`
                query FindFeed($locale: String!) {
                    posts(locale: $locale) {
                        locale
                        id
                        slug
                        banner {
                            url
                        }
                        description
                        committee {
                            name
                        }
                        title
                        published_at
                        body
                        categories {
                            name
                        }
                        published_at
                    }
                    events(locale: $locale) {
                        locale
                        id
                        title
                        slug
                        category {
                            name
                        }
                        place {
                            name
                        }
                        committee {
                            name
                        }
                        startTime
                        deadline
                        description
                        banner {
                            url
                        }
                        published_at
                    }
                    jobs(locale: $locale) {
                        locale
                        body
                        id
                        deadlineDate
                        slug
                        title
                        banner {
                            url
                        }
                        jobCategory {
                            name
                        }
                        company {
                            name
                        }
                        description
                        published_at
                    }
                }
            `,
            variables: { locale },
        });

        return _.chain([...posts, ...jobs, ...events])
            .sortBy("published_at")
            .map((item) => ({
                ...item,
                id: item.__typename + "-" + item?.id,
                author: getAuthor(item),
                categories: getCategories(item),
                __body: getBody(item),
                __calendarDate: getDateTime(item),
                __href: getHref(item),
            }))
            .reverse()
            .value();
    },
};

export default post;
