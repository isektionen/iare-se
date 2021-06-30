import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import Head from "next/head";
import "@fontsource/source-sans-pro";
import customTheme from "styles/customTheme";
import "styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import strapi from "lib/strapi";
import { RecoilRoot } from "recoil";
import Layout from "components/layout";
import React, { StrictMode } from "react";

const App = ({ Component, pageProps }: AppProps) => {
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
