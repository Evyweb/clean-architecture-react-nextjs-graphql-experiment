import {
    ICreateCharacterUseCase
} from "@/src/client/application/ports/ICreateCharacterUseCase";
import {useDependency} from "@/src/client/presentation/hooks/useDependency";

import {CharacterToCreateDTO} from "@/src/client/application/ports/ICharacterRepository";
import {CreateCharacterUseCaseRequest} from "@/src/client/application/usecases/CreateCharacter/CreateCharacterUseCaseRequest";

export const useCreateCharacterUseCase = (): ICreateCharacterUseCase => {
    const repository = useDependency('characterRepository');
    return {
        execute: async (request: CreateCharacterUseCaseRequest): Promise<void> => {
            const characterToCreate: CharacterToCreateDTO = {
                name: request.name,
                species: request.species,
                homeworld: request.homeworld
            };
            await repository.createCharacter(characterToCreate);
        }
    };
}