import { HttpLink } from "@apollo/client";
import {
    registerApolloClient,
    ApolloClient,
    InMemoryCache,
} from "@apollo/experimental-nextjs-app-support";

export const { PreloadQuery } = registerApolloClient(() => {
    return new ApolloClient({
        cache: new InMemoryCache(),
        link: new HttpLink({
            uri: "http://localhost:3000/api/graphql",
        }),
    });
});