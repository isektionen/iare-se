import { queryLocale } from "lib/strapi";
import { TLocale } from "types/global";
import { AcceptedStudent, AssumedStudent } from "types/strapi";

const student = {
    accepted: async (locale: TLocale) => {
        const { data, error } = await queryLocale<{
            acceptedStudent: AcceptedStudent;
        }>`
        query FindAcceptedStudent {
            acceptedStudent(locale: ${locale}) {
                content
                title
                images {
                    id
                    url
                }
            }
        }
    `;
        return { acceptedStudent: data.acceptedStudent, error };
    },
    assumed: async (locale: TLocale) => {
        const { data, error } = await queryLocale<{
            assumedStudent: AssumedStudent;
        }>`
        query FindAssumedStudent {
            assumedStudent(locale: ${locale}) {
                content
                title
                images {
                    id
                    url
                }
            }
        }
    `;
        return { assumedStudent: data.assumedStudent, error };
    },
};

export default student;
