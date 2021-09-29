import { queryLocale } from "lib/strapi";
import { TLocale } from "types/global";
import { Committee, CommitteeLandingpage } from "types/strapi";
import _ from "underscore";

const getLandingPage = async (locale: TLocale) => {
    const { data, error } = await queryLocale<{
        committeeLandingpage: CommitteeLandingpage;
    }>`
        query FindCommitteeLandingPage {
            committeeLandingpage(locale:${locale}) {
                title
                content
            }
        }`;
    return {
        committeeLandingpage: data.committeeLandingpage as CommitteeLandingpage,
        error,
    };
};

const getCommittees = async (locale: TLocale) => {
    const { data, error } = await queryLocale<{
        committees: Committee[];
    }>`query FindAllCommittees {
            committees(locale: ${locale}) {
                id
                slug
                name
                content
                locale
                abbreviation
                representatives {
                    user {
                        firstname
                        lastname
                    }
                }
                committee_objective {
                    objective
                }
                contacts {
                    id
                    user {
                        firstname
                        lastname
                    }
                    cover {
                        url
                    }
                    committee_roles {
                        role
                        contact
                    }
                }
                icon {
                    url
                }
                localizations {
                    locale
                    slug
                }
            }
        }
    `;
    return { committees: data.committees, error };
};

const find = (committees: Committee[], options: Record<string, any>) => {
    const committee = committees.find((entity) => _.isMatch(entity, options));
    return {
        committee: committee ? committee : null,
        error: committee ? false : true,
    };
};

const committee = { find, getCommittees, getLandingPage };

export default committee;
