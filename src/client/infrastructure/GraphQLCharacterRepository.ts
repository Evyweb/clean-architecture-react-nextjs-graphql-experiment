import {Character} from "@/src/client/domain/Character";
import {fetchGraphQL} from "@/src/client/infrastructure/fetchGraphQL";
import {CharacterToCreateDTO, ICharacterRepository} from "@/src/client/application/ports/ICharacterRepository";
import {CREATE_CHARACTER, GET_CHARACTERS} from "@/src/client/infrastructure/queries";

type CharacterDTO = {
    id: string;
    name: string;
    species: string;
    homeworld: string;
};

export interface GetCharactersDTO {
    characters: CharacterDTO[];
}

export const GraphQLCharacterRepository = (): ICharacterRepository => {

    const endpoint = "http://localhost:3000/api/graphql";

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
        async createCharacter(character: CharacterToCreateDTO): Promise<void> {
            await fetchGraphQL(endpoint, CREATE_CHARACTER, character);
        },
    };
};
