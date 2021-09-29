import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import Head from "next/head";
import customTheme from "styles/customTheme";
import "styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import strapi from "lib/strapi";
import { RecoilRoot } from "recoil";
import Layout from "components/layout";
import React, { StrictMode, Suspense } from "react";
import { DefFooter, DefHeader } from "types/global";
import { pdfjs } from "react-pdf";

import "@fontsource/source-sans-pro/200.css";
import "@fontsource/source-sans-pro/300.css";
import "@fontsource/source-sans-pro/400.css";
import "@fontsource/source-sans-pro/600.css";
import "@fontsource/oxygen/300.css";
import "@fontsource/oxygen/400.css";
import "@fontsource/oxygen/700.css";

interface Props extends AppProps {
    headerProps: DefHeader;
    footerProps: DefFooter;
}

const App = ({ Component, pageProps }: Props) => {
    //pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
    pdfjs.GlobalWorkerOptions.workerSrc = "../js/pdf.worker.js";

    return (
        <StrictMode>
            <RecoilRoot>
                <ChakraProvider theme={customTheme}>
                    <ApolloProvider client={strapi}>
                        <Head>
                            <meta
                                name="viewport"
                                content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
                            />
                        </Head>

                        <Layout>
                            <Component {...pageProps} />
                        </Layout>
                    </ApolloProvider>
                </ChakraProvider>
            </RecoilRoot>
        </StrictMode>
    );
};

export default App;
