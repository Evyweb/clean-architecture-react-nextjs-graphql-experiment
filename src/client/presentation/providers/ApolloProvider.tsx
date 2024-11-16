'use client';

import {HttpLink} from '@apollo/client';
import {PropsWithChildren} from 'react';
import {ApolloClient, ApolloNextAppProvider, InMemoryCache} from "@apollo/experimental-nextjs-app-support";

const ApolloWrapper = ({children}: PropsWithChildren) => {

    function makeClient() {
        const httpLink = new HttpLink({
            uri: "http://localhost:3000/api/graphql",
            fetchOptions: {cache: "no-store"},
        });

        return new ApolloClient({
            cache: new InMemoryCache(),
            link: httpLink,
        });
    }

    return (
        <ApolloNextAppProvider makeClient={makeClient}>{children}</ApolloNextAppProvider>
    );
};

export default ApolloWrapper;
