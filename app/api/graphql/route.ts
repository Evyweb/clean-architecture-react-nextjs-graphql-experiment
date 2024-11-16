import {startServerAndCreateNextHandler} from '@as-integrations/next';
import {ApolloServer} from '@apollo/server';
import {gql} from 'graphql-tag';
import {CreateCharacterRequest} from "@/src/server/presentation/requests/CreateCharacterRequest";
import {inject} from "@/src/server/DependencyInjection";
import {TYPE_DEFS} from "@/src/shared/graphQL/types";

const controller = inject('CHARACTERS_CONTROLLER');

const server = new ApolloServer({
    resolvers: {
        Query: {
            characters: () => controller.getCharacters(),
        },
        Mutation: {
            createCharacter: (_: never, request: CreateCharacterRequest) => controller.createCharacter(request),
        },
    },
    typeDefs: gql`${TYPE_DEFS}`,
});

const graphqlHandler = startServerAndCreateNextHandler(server);

export async function GET(request: Request): Promise<Response> {
    return graphqlHandler(request);
}

export async function POST(request: Request): Promise<Response> {
    return graphqlHandler(request);
}