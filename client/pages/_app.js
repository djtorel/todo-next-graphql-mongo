import App from 'next/app';
import Head from 'next/head';
import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import withApolloClient from '../lib/with-apollo-client';

class MyApp extends App {
  render() {
    const { Component, pageProps, apolloClient } = this.props;
    return (
      <>
        <Head>
          <meta charset="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
          <title>Todo App</title>
        </Head>
        <main>
          <ApolloProvider client={apolloClient}>
            <Component {...pageProps} />
          </ApolloProvider>
        </main>
      </>
    );
  }
}

export default withApolloClient(MyApp);
