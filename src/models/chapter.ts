import { queryLocale } from "lib/strapi";
import { TLocale } from "types/global";
import { Chapter, Representative } from "types/strapi";
import _ from "underscore";

const hydrate = async (locale: TLocale) => {
    const {
        data: { chapter },
        error,
    } = await queryLocale<{ chapter: Chapter }>`
    query FindChapter {
        chapter(locale: ${locale}) {
            content
            title
            board {
                representatives(where: { hidden: false }) {
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
                        abbreviation
                        committee_objectives {
                            objective
                        }
                    }
                }
            }
            images {
                id
                url
            }
        }
    }
    `;
    return { chapter, error };
};

const getChapter = async (locale: TLocale) => await hydrate(locale);
const getBoard = async (locale: TLocale, _chapter: Chapter | null = null) => {
    let chapter;
    let error;
    if (_chapter) {
        chapter = _chapter;
    } else {
        const { chapter: baseChapter, error: baseError } = await getChapter(
            locale
        );
        chapter = baseChapter;
        error = baseError;
    }
    if (error) {
        return { board: {}, error };
    }
    const { board } = chapter;
    const { representatives } = await getRepresentatives(locale, chapter);
    return { board: { ...board, representatives }, error };
};

const getRepresentatives = async (
    locale: TLocale,
    _chapter: Chapter | null = null
) => {
    let chapter: Chapter;
    let error;
    if (_chapter) {
        chapter = _chapter;
    } else {
        const { chapter: baseChapter, error: baseError } = await getChapter(
            locale
        );
        chapter = baseChapter;
        error = baseError;
    }
    if (error) {
        return { representatives: [], error };
    }
    const { commonObjective } = await getCommonObjective(locale, chapter);
    const representatives = _.chain(
        chapter?.board?.representatives as Representative[]
    )
        .map((rep) => {
            return {
                ...rep,
                committee_roles: rep?.committee_roles?.filter((role) =>
                    role?.committee_objectives
                        ?.map((obj) => obj?.objective)
                        .includes(commonObjective as string)
                ),
            };
        })
        .value();

    return { representatives, error };
};

const getCommonObjective = async (
    locale: TLocale,
    _chapter: Chapter | null = null
) => {
    let chapter: Chapter;
    let error;
    if (_chapter) {
        chapter = _chapter;
    } else {
        const { chapter: baseChapter, error: baseError } = await getChapter(
            locale
        );
        chapter = baseChapter;
        error = baseError;
    }
    if (error) {
        return { objectives: [], error };
    }
    const objectives =
        chapter.board?.representatives
            ?.map((rep) =>
                rep?.committee_roles?.map((com) =>
                    com?.committee_objectives?.map((obj) => obj?.objective)
                )
            )
            .flat()
            .flat() ?? [];
    const commonObjective = _.chain(objectives)
        .countBy()
        .pairs()
        .map(([k, v]) => ({ key: k, value: v }))
        .max("value")
        .get("key")
        .value();
    return { commonObjective, error };
};

const chapter = {
    getChapter,
    getBoard,
    getRepresentatives,
    getCommonObjective,
};

export default chapter;
