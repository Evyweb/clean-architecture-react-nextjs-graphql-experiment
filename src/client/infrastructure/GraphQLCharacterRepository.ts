import {CharacterToCreateDTO, ICharacterRepository} from "@/src/client/application/ports/ICharacterRepository";
import {Character} from "@/src/client/domain/Character";

export interface GetCharactersDTO {
    characters: {
        id: string;
        name: string;
        homeworld: string;
        species: string;
    }[];
}

export const GraphQLCharacterRepository = (
    createCharacterMutation: (mutations: { variables: CharacterToCreateDTO }) => Promise<unknown>,
    getCharactersQueryResult: GetCharactersDTO
): ICharacterRepository => {
    return {
        createCharacter: async (characterToCreate: CharacterToCreateDTO) => {
            await createCharacterMutation({
                variables: characterToCreate,
            })
        },
        getAll: (): Character[] => {
            return getCharactersQueryResult.characters.map((character) => ({
                id: character.id,
                name: character.name,
                homeworld: character.homeworld,
                species: character.species
            }));
        }
    }
}