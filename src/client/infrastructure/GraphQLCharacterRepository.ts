import {Character} from "@/src/client/domain/Character";
import {fetchGraphQL} from "@/src/client/infrastructure/fetchGraphQL";

type CharacterDTO = {
    id: string;
    name: string;
    species: string;
    homeworld: string;
};

export interface GetCharactersDTO {
    characters: CharacterDTO[];
}

export interface IGraphQLCharacterRepository {
    getAll(): Promise<Character[]>;

    createCharacter(characterToCreate: CharacterDTO): Promise<void>;
}

export const GraphQLCharacterRepository = (): IGraphQLCharacterRepository => {

    const endpoint = "http://localhost:3000/api/graphql";

    const GET_CHARACTERS = `
        query {
            characters {
                id
                name
                species
                homeworld
            }
        }
    `;

    const CREATE_CHARACTER = `
        mutation CreateCharacter($name: String!, $species: String!, $homeworld: String!) {
            createCharacter(name: $name, species: $species, homeworld: $homeworld) {
                id
                name
                species
                homeworld
            }
        }
    `;

    return {
        async getAll(): Promise<Character[]> {
            const result = await fetchGraphQL<GetCharactersDTO>(endpoint, GET_CHARACTERS);
            return result.characters.map((character: CharacterDTO) => ({
                id: character.id,
                name: character.name,
                species: character.species,
                homeworld: character.homeworld,
            }));
        },
        async createCharacter(character: CharacterDTO): Promise<void> {
            await fetchGraphQL(endpoint, CREATE_CHARACTER, character);
        },
    };
};
