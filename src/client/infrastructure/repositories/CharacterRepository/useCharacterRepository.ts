import {ICharacterRepository} from "@/src/client/application/ports/driven/ICharacterRepository";
import {CreateCharacterDTO} from "@/src/client/application/usecases/CreateCharacter/CreateCharacterDTO";
import {useCreateCharacterMutation} from "@/src/client/infrastructure/repositories/CharacterRepository/useCreateCharacterMutation";
import {Character} from "@/src/client/domain/Character";
import {useLoadCharactersQuery} from "@/src/client/infrastructure/repositories/CharacterRepository/useLoadCharactersQuery";

export const useCharacterRepository = (): ICharacterRepository => {
    const {createCharacterMutation} = useCreateCharacterMutation();
    const loadCharactersQueryResult = useLoadCharactersQuery();

    return {
        createCharacter: async (characterToCreate: CreateCharacterDTO) => {
            await createCharacterMutation({
                variables: characterToCreate,
            })
        },
        getAll: (): Character[] => {
            return loadCharactersQueryResult.characters.map(character => ({
                id: character.id,
                name: character.name,
                homeworld: character.homeworld,
                species: character.species
            }));
        }
    };
}