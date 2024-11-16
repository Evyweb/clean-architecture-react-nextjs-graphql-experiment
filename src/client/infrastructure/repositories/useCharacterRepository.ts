import {ICharacterRepository} from "@/src/client/application/ports/driven/ICharacterRepository";
import {CreateCharacterDTO} from "@/src/client/application/usecases/CreateCharacter/CreateCharacterDTO";
import {Status} from "@/src/client/domain/Status";
import {useCreateCharacterMutation} from "@/src/client/infrastructure/repositories/useCreateCharacterMutation";
import {Character} from "@/src/client/domain/Character";
import {useLoadCharactersQuery} from "@/src/client/infrastructure/repositories/useLoadCharactersQuery";

export const useCharacterRepository = (): ICharacterRepository => {
    const {createCharacterMutation, createCharacterStatus} = useCreateCharacterMutation();
    const loadCharactersQueryResult = useLoadCharactersQuery();

    return {
        createCharacter: async (characterToCreate: CreateCharacterDTO) => {
            await createCharacterMutation({
                variables: characterToCreate,
            })
        },
        getCreateCharacterStatus: (): Status => ({
            loading: createCharacterStatus.loading,
            error: createCharacterStatus.error,
            character: createCharacterStatus.data?.createCharacter
        }),
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