import {
    GridItem,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    Flex,
    Spacer,
    Text,
} from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import React from "react";

interface CustomRepresentative {
    name: string;
    role: string;
    email: string;
    abbr: string;
    imageSrc: string;
    personal_desc: string;
    role_desc: string;
}

export const Description = (props: CustomRepresentative) => {
    const { t } = useTranslation("contact");
    return (
        <GridItem h="full" mt={5} w="full">
            <Tabs colorScheme="brand" isFitted>
                <TabList>
                    <Tab>
                        {t("tabs.personal.label", { person: props.name })}
                    </Tab>
                    <Tab>{t("tabs.role.label")}</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <Text>
                            {props.personal_desc
                                ? props.personal_desc
                                : t("tabs.nocontent")}
                        </Text>
                    </TabPanel>
                    <TabPanel>
                        <Flex>
                            <Text>Email:</Text>
                            <Spacer />
                            <Text>{props.email}</Text>
                        </Flex>
                        <Text>
                            {props.role_desc
                                ? props.role_desc
                                : t("tabs.nocontent")}
                        </Text>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </GridItem>
    );
};
