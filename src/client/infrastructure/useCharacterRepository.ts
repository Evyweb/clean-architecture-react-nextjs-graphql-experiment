import {CharacterToCreateDTO, ICharacterRepository} from "@/src/client/application/ports/ICharacterRepository";
import {
    useCreateCharacterMutation
} from "@/src/client/infrastructure/useCreateCharacterMutation";
import {Character} from "@/src/client/domain/Character";
import {
    useGetCharactersQuery
} from "@/src/client/infrastructure/useGetCharactersQuery";

export const useCharacterRepository = (): ICharacterRepository => {
    const {createCharacterMutation} = useCreateCharacterMutation();
    const getCharactersQueryResult = useGetCharactersQuery();

    return {
        createCharacter: async (characterToCreate: CharacterToCreateDTO) => {
            await createCharacterMutation({
                variables: characterToCreate,
            })
        },
        getAll: (): Character[] => {
            return getCharactersQueryResult.characters.map(character => ({
                id: character.id,
                name: character.name,
                homeworld: character.homeworld,
                species: character.species
            }));
        }
    };
}