'use client';

import {PropsWithChildren} from 'react';
import {ApolloClient, ApolloNextAppProvider, InMemoryCache} from "@apollo/experimental-nextjs-app-support";

const ApolloWrapper = ({children}: PropsWithChildren) => {

    function makeClient() {
        return new ApolloClient({
            cache: new InMemoryCache(),
            uri: 'http://localhost:3000/api/graphql',
        });
    }

    return (
        <ApolloNextAppProvider makeClient={makeClient}>{children}</ApolloNextAppProvider>
    );
};

export default ApolloWrapper;
