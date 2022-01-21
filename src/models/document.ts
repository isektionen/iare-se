import gql from "graphql-tag";
import strapi, { queryLocale } from "lib/strapi";
import { TLocale } from "types/global";

const getDocuments = async (locale: TLocale) => {
    const { data, error } = await queryLocale<{ document: DocumentType }>`
            query FindDocs {
                document(locale: ${locale}) {
                    document {
                        name
                        date
                        category {
                            name
                        }
                        file {
                            url
                            formats
                        }
                        archived
                        current
                        businessYear
                    }
                }
            }
        `;
    return { documents: data?.document ?? [], error };
};

const document = {
    getDocuments,
};

export default document;
