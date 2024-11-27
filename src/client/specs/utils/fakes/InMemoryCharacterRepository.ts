import {Character} from "@/src/client/domain/Character";
import {CharacterToCreateDTO, ICharacterRepository} from "@/src/client/application/ports/ICharacterRepository";

export const InMemoryCharacterRepository = (existingCharacters: Character[] = []): ICharacterRepository => {
    const characters: Character[] = existingCharacters;

    return {
        createCharacter: async (characterToCreate: CharacterToCreateDTO) => {
            characters.push({
                id: (characters.length + 1).toString(),
                name: characterToCreate.name,
                species: characterToCreate.species,
                homeworld: characterToCreate.homeworld
            });
        },
        getAll: async () => {
            return characters;
        }
    };
}