import "../styles/app.css";
import { Box, Button, ButtonGroup, ChakraProvider, Flex, HStack } from '@chakra-ui/react'

import { Provider } from 'react-redux'
import App, { AppContext, AppProps } from "next/app";
import chakraTheme from "../styles/chakraTheme";
import store from '../app/store'
import AuthedNav from "../components/authed-nav/AuthedNav";
import PublicNav from '../components/PublicNav';
import Footer from "../components/Footer";
import { NextPage } from "next/types";
import { JsxElement } from "typescript";
import Head from 'next/head'
import { UserProvider } from '@auth0/nextjs-auth0';
import withRoleAuthorization from "../lib/withRoleAuthorization";

// export type NextApplicationPage<P = any, IP = P> = NextPage<P, IP> & {
//   publicPage?: boolean;
// };

interface AuthPageData {
  role: String,
  loading: JSX.Element,
  unauthorized: String
}

export type NextApplicationPage<P = any, IP = P> = NextPage<P, IP> & {
  auth?: AuthPageData;
};



export default function MyApp(props: AppProps) {
  
  const {
    Component,
    pageProps,
  }: { Component: NextApplicationPage; pageProps: any } = props;
  // const { role, loading, unauthorized } = Component.auth || {};


  const { roles, error } = Component.auth || {};
  const AuthedComp = withRoleAuthorization(Component, pageProps, roles, error)
  const PublicComp = Component;
  
  return (
    <Provider store={store}>
      <Head>
        <title>The Coder Career</title>
        <meta name='description' content='Level up your career in tech. Find the best jobs.' />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <UserProvider>

      <ChakraProvider theme={chakraTheme}>
          {Component.auth ? (
              <>
                <AuthedNav><AuthedComp /></AuthedNav>
                
              </>
          ) : (
            <>
              <PublicNav />
              <PublicComp {...pageProps} />
            </>
          )}
          <Footer />
      </ChakraProvider>
      </UserProvider>


    </Provider>
  );
}
