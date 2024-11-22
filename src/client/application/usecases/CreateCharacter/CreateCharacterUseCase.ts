import {
    CreateCharacterUseCaseRequest
} from "@/src/client/application/usecases/CreateCharacter/CreateCharacterUseCaseRequest";
import {CharacterToCreateDTO, ICharacterRepository} from "@/src/client/application/ports/ICharacterRepository";

export const CreateCharacterUseCase = (repository: ICharacterRepository) => {
    return {
        execute: async (request: CreateCharacterUseCaseRequest): Promise<void> => {
            const characterToCreate: CharacterToCreateDTO = {
                name: request.name,
                species: request.species,
                homeworld: request.homeworld
            };
            await repository.createCharacter(characterToCreate);
        }
    }
}