import { graphql, buildSchema } from 'graphql';
import { inject } from "@/src/server/DependencyInjection";

const createCharacterController = inject('CREATE_CHARACTER_CONTROLLER');
const getCharactersController = inject('GET_CHARACTERS_CONTROLLER');

const schema = buildSchema(`
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
`);

const rootValue = {
    characters: async () => {
        const viewModel = await getCharactersController.getCharacters();
        return viewModel.characters;
    },
    createCharacter: async ({ name, species, homeworld }: { name: string; species: string; homeworld: string }) => {
        const viewModel = await createCharacterController.createCharacter({ name, species, homeworld });
        return viewModel.createdCharacter;
    },
};

async function graphqlHandler(request: Request): Promise<Response> {
    const { query, variables } = await request.json();

    const result = await graphql({
        schema,
        source: query,
        rootValue,
        variableValues: variables,
    });

    return new Response(JSON.stringify(result), {
        status: result.errors ? 400 : 200,
        headers: { 'Content-Type': 'application/json' },
    });
}

export async function GET(request: Request): Promise<Response> {
    return graphqlHandler(request);
}

export async function POST(request: Request): Promise<Response> {
    return graphqlHandler(request);
}
