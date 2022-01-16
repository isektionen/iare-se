import { queryLocale } from "lib/strapi";
import { TLocale } from "types/global";
import { Post, Event, Jobs, UploadFile } from "types/strapi";
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
            return item?.schedule?.start;
        case "Post":
            return item.published_at;
        case "Jobs":
            return item.deadlineDate;
        default:
            return null;
    }
};

const _getCategories = (item: Event | Post | Jobs) => {
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
            return item?.body ?? "";
        case "Post":
            return item?.body ?? "";
        case "Jobs":
            return item?.body ?? "";
        default:
            return "";
    }
};

const getMedia = (item: Event | Post | Jobs) => {
    switch (item.__typename) {
        case "Event":
            return _.first(item.media || []) as UploadFile;
        case "Post":
            return item.banner as UploadFile;
        case "Jobs":
            return item.banner as UploadFile;
    }
};

const getPost = async (locale: TLocale, slug: string) => {
    const { data, error } = await queryLocale<{ posts: Post[] }>`
        query FindSinglePost {
            posts(locale: ${locale}, where: {slug: ${slug}}) {
            title
            committee {
                name
            }
            body
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
    return { post: _.first(data.posts), error };
};

const getPosts = async (locale: TLocale) => {
    const { data, error } = await queryLocale<{ posts: Post[] }>`
        query FindManyPosts {
            posts(locale: ${locale}) {
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
        }`;
    return { posts: data.posts, error };
};

const getEvents = async (locale: TLocale) => {
    const { data, error } = await queryLocale<{ events: Event[] }>`
    query FindManyEvents {
        events(locale: ${locale}, where: {public: true}) {
            locale
            id
            title
            slug
            category {
              name
            }
            media {
              name
              formats
            }
            schedule {
              start
              deadline
            }
            description
            location
            published_at
                        
                        
        }
    }`;
    return { events: data.events, error };
};

const getJobs = async (locale: TLocale) => {
    const { data, error } = await queryLocale<{ jobs: Jobs[] }>`
        query FindManyJobs {
            jobs(locale: ${locale}) {
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
        }`;
    return { jobs: data.jobs, error };
};

const getFeed = async (locale: TLocale) => {
    // Changed to vars here in order to have opportunity to create empty jobs etc lists
    var { posts, error: postError } = await getPosts(locale);
    var { events, error: eventError } = await getEvents(locale);
    var { jobs, error: jobError } = await getJobs(locale);

    // This old statement made it so that posterrors would hinder jobs from showing
    //if (jobError || postError || eventError) {
    //return { feed: [], error: true };
    //}

    // Changed
    if (jobError) {
        jobs = [];
    }

    if (postError) {
        posts = [];
    }

    if (eventError) {
        events = [];
    }

    const feed = _.chain([...posts, ...jobs, ...events])
        .sortBy("published_at")
        .map((item) => ({
            ...item,
            id: item.__typename + "-" + item?.id,
            author: getAuthor(item),
            categories: _getCategories(item),
            __body: getBody(item),
            __calendarDate: getDateTime(item),
            __href: getHref(item),
            __media: getMedia(item),
        }))
        .reverse()
        .value();
    return { feed, error: false };
};

const getCategories = async (locale: TLocale, _feed: any = null) => {
    let feed;
    let error;
    if (_feed) {
        feed = _feed;
    } else {
        const { feed: baseFeed, error: baseError } = await getFeed(locale);
        feed = baseFeed;
        error = baseError;
    }
    if (error) {
        return { categories: [], error };
    }

    const categories = _.chain(feed)
        .map((item) => ({
            type: item.__typename,
            value: _.pluck(item?.categories ?? [], "name"),
        }))
        .groupBy("type")
        .mapObject((item) =>
            _.pluck(item, "value")
                .flat()
                .filter((item) => item)
        )
        .value();
    return { categories, error };
};

const blog = { getCategories, getFeed, getPost };

export default blog;
