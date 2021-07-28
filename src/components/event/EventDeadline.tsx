import React from "react";
import { formatDistanceToNow, isAfter } from "date-fns";
import { enGB, sv } from "date-fns/locale";
import { Flex } from "@chakra-ui/react";
import { getTimeLeft } from "utils/dates";
import useTranslation from "next-translate/useTranslation";
interface Props {
    deadline: string;
    description: {
        before: string;
        after: string;
    };
}
export const EventDeadline = (props: Props) => {
    const { lang } = useTranslation();
    const timeLeft = getTimeLeft(props.deadline, false, lang);
    const isDue = isAfter(new Date(), new Date(props.deadline));

    const description = isDue
        ? props.description.after
        : props.description.before;
    return (
        <Flex
            mt={4}
            borderRadius="md"
            bg="gray.900"
            color="white"
            p={2}
            justify="center"
        >
            {description.replace("{TIMELEFT}", timeLeft)}
        </Flex>
    );
};
