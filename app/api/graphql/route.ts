import {startServerAndCreateNextHandler} from '@as-integrations/next';
import {ApolloServer} from '@apollo/server';
import {gql} from 'graphql-tag';
import {CreateCharacterRequest} from "@/src/server/presentation/requests/CreateCharacterRequest";
import {inject} from "@/src/server/DependencyInjection";

export const TYPE_DEFS = `
    type Query {
        characters: [Character]
    }
    
    type Mutation {
        createCharacter(name: String!, species: String!, homeworld: String!): Character
    }
    
    type Character {
        id: String
        name: String
        species: String
        homeworld: String
    }
`

const controller = inject('CHARACTERS_CONTROLLER');

const server = new ApolloServer({
    resolvers: {
        Query: {
            characters: async () => {
                const viewModel = await controller.getCharacters();
                return viewModel.characters;
            },
        },
        Mutation: {
            createCharacter: async (_: never, request: CreateCharacterRequest) => {
                const viewModel = await controller.createCharacter(request);
                return viewModel.createdCharacter;
            },
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