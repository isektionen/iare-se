import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import Head from "next/head";
import "@fontsource/source-sans-pro";
import customTheme from "styles/customTheme";
import "styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import { client } from "lib/api";

const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <ChakraProvider theme={customTheme}>
            <ApolloProvider client={client}>
                <Head>
                    <meta
                        name="viewport"
                        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
                    />
                </Head>

                <Component {...pageProps} />
            </ApolloProvider>
        </ChakraProvider>
    );
};

export default MyApp;
