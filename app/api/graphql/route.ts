import {startServerAndCreateNextHandler} from '@as-integrations/next';
import {ApolloServer} from '@apollo/server';
import {gql} from 'graphql-tag';
import {CreateCharacterRequest} from "@/src/server/presentation/requests/CreateCharacterRequest";
import {inject} from "@/src/server/DependencyInjection";

const createCharacterController = inject('CREATE_CHARACTER_CONTROLLER');
const getCharactersController = inject('GET_CHARACTERS_CONTROLLER');

const server = new ApolloServer({
    resolvers: {
        Query: {
            characters: async () => {
                const viewModel = await getCharactersController.getCharacters();
                return viewModel.characters;
            },
        },
        Mutation: {
            createCharacter: async (_: never, request: CreateCharacterRequest) => {
                const viewModel = await createCharacterController.createCharacter(request);
                return viewModel.createdCharacter;
            },
        },
    },
    typeDefs: gql`
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
    `,
});

const graphqlHandler = startServerAndCreateNextHandler(server);

export async function GET(request: Request): Promise<Response> {
    return graphqlHandler(request);
}

export async function POST(request: Request): Promise<Response> {
    return graphqlHandler(request);
}