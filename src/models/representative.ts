import { queryLocale } from "lib/strapi";
import { TLocale } from "types/global";
import { CommitteeFunction, Representative } from "types/strapi";
import _ from "underscore";

const _getRepresentatives = async (locale: TLocale) => {
    const { data, error } = await queryLocale<{
        representatives: Representative[];
    }>`query FindManyReps {
        representatives(locale: ${locale}, where: { hidden: false }) {
            id
            user {
                firstname
                lastname
            }
            cover {
                url
                formats
            }
            committee_roles {
                id
                contact
                role
                featured_role
                slug
                abbreviation
                committee_objectives {
                    id
                    objective
                }
            }
            committee_objectives {
                id
                objective
            }
        }
    }`;
    return { representatives: data.representatives, error };
};

/**
     * Group by objectives & filtering relevant objectives per representative
     * 
     * Conversion example:
     * 
     *  From: [
                {
                    user: {
                        firstname: 'porter',
                        lastname: 'brun',
                    },
                    committee_roles: [
                        {
                            committee_objectives: [
                                {
                                    objective: 'a'
                                },
                                {
                                    objective: 'b'
                                },
                            ],
                        }, ...
                    ]
                },
                ...
            ]
            
        To: {
            a: [
                {
                user: {
                    firstname: 'porter',
                    lastname: 'brun',
                },
                committee_roles: [
                    {
                        committee_objectives: [
                            {
                                objective: 'a'
                            }
                        ],
                    }
                ]

            },
            ...
            ],
            b: [
                {
                    user: {
                        firstname: 'porter',
                        lastname: 'brun',
                    },
                    committee_roles: [
                        {
                            committee_objectives: [
                                {
                                    objective: 'b'
                                }
                            ],
                        }
                    ]
        
                },
                ...
            ]
        }

    
     */

const getRepresentatives = async (locale: TLocale) => {
    const { representatives: baseRepresentatives, error } =
        await _getRepresentatives(locale);
    if (error) {
        return { representatives: [], error };
    }
    const { objectives } = await getObjectives(locale, baseRepresentatives);

    const representatives = _.chain(objectives)
        .reduce((acc, obj) => {
            const it = baseRepresentatives
                .filter((rep) => {
                    if (!rep) return false;
                    const roles = _.propertyOf(rep)("committee_roles");
                    if (!roles) return false;
                    return _.chain(roles)
                        .pluck("committee_objectives")
                        .flatten()
                        .pluck("objective")
                        .some((o) => o === obj)
                        .value();
                })
                .map((rep) => _.omit(rep, "committee_objectives"))
                .map((rep) => {
                    const roles = rep?.committee_roles?.map((role) => ({
                        ...role,
                        committee_objectives:
                            role?.committee_objectives?.filter(
                                (_obj) => _obj?.objective === obj
                            ),
                    })) as CommitteeFunction[];

                    return {
                        ...rep,
                        tags: getTags(roles),
                        committee_roles: _.reject(
                            roles,
                            (_obj) => _obj?.committee_objectives?.length === 0
                        ),
                    };
                }) as Representative[];
            if (_.has(acc, obj)) {
                return { ...acc, [obj]: [...acc[obj], ...it] };
            }
            return { ...acc, [obj]: [...it] };
        }, {} as Record<string, Representative[]>)
        .extend({
            __all__: _.map(baseRepresentatives, (rep) => {
                const roles = rep?.committee_roles as CommitteeFunction[];

                return {
                    ..._.omit(rep, "committee_objectives"),
                    tags: getTags(roles),
                };
            }),
        })
        .value();
    return { representatives, error };
};

const getObjectives = async (
    locale: TLocale,
    _representatives: Representative[] | null = null
) => {
    let representatives: Representative[];
    let error;
    if (_representatives) {
        representatives = _representatives;
    } else {
        const { representatives: baseRepresentatives, error: baseError } =
            await _getRepresentatives(locale);
        representatives = baseRepresentatives;
        error = baseError;
    }

    const objectives = _.chain(representatives)
        .pluck("committee_objectives")
        .flatten()
        .pluck("objective")
        .unique()
        .value() as string[];
    return { objectives };
};

const getTags = (roles: CommitteeFunction[]) =>
    _.chain(
        [
            ..._.pluck(roles, "role"),
            ..._.pluck(roles, "abbreviation"),
            ...(_.chain(roles)
                .pluck("committee_objectives")
                .flatten()
                .map("objective")
                .value() as string[]),
        ].map((text) => text?.toLowerCase())
    )
        .unique()
        .filter((o) => o)
        .value();

const getRepresentative = async (locale: TLocale, slug: string) => {
    const { data, error } = await queryLocale<{
        committeeFunctions: CommitteeFunction[];
    }>`
        query FindSingleRep {
            committeeFunctions(locale: ${locale}, where: { slug: ${slug} }) {
                contact
                role
                abbreviation
                role_description
                representatives {
                    user {
                        firstname
                        lastname
                    }
                    personal_description
                    cover {
                        url
                        formats
                    }
                }
            }
        }
    `;
    return { representative: _.first(data.committeeFunctions), error };
};

const representative = {
    getRepresentatives,
    getObjectives,
    getTags,
    getRepresentative,
};

export default representative;
