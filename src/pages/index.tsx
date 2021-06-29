import { Box } from "@chakra-ui/layout";
import Layout from "components/layout";

import { GetStaticProps } from "next";
import { GlobalProps } from "types/global";
import { HeaderProps } from "types/header";

const Home = (props: GlobalProps) => {
    return (
        <Layout header={props.header} footer={props.footer}>
            <Box mb={8} w="full"></Box>
        </Layout>
    );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const menuList = [
        {
            title: "Aktuellt",
            dropDownMenu: false,
            listItems: [
                {
                    href: "",
                    name: "Händelser",
                },
                {
                    href: "",
                    name: "Jobb",
                },
                {
                    href: "",
                    name: "Event",
                },
            ],
        },
        {
            title: "Sektionen",
            dropDownMenu: true,
            listItems: [
                {
                    href: "",
                    name: "Styrelsen",
                },
                {
                    href: "",
                    name: "Nämnder",
                },
                {
                    href: "",
                    name: "Projekt",
                },
                {
                    href: "",
                    name: "Dokument",
                },
                {
                    href: "",
                    name: "Grafisk Profil",
                },
                {
                    href: "",
                    name: "Bokning",
                },
            ],
        },
        {
            title: "Sökande",
            dropDownMenu: true,
            listItems: [
                {
                    href: "",
                    name: "Vad är Industriell Ekonomi?",
                },
                {
                    href: "",
                    name: "Utbildningen",
                },
                {
                    href: "",
                    name: "Intervjuer från olika årgångar",
                },
                {
                    href: "",
                    name: "Intervjuer från alumner",
                },
                {
                    href: "",
                    name: "Studentliv",
                },
            ],
        },
        {
            title: "Företag",
            dropDownMenu: true,
            listItems: [
                {
                    href: "",
                    name: "Samarbeten",
                },
                {
                    href: "",
                    name: "Annonsering",
                },
            ],
        },
    ];

    return {
        props: {
            header: {
                menuList,
                languages: [
                    {
                        name: "Svenska",
                        code: "se",
                    },
                    {
                        name: "English",
                        code: "en",
                    },
                ],
                contact: "Kontakt",
            },
            footer: {
                responsiblePublisher: "Alice?",
                menuList,
            },
        },
    };
};

export default Home;
