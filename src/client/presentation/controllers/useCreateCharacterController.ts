import {useDependency} from "@/app/_hooks/useDependency";
import {CreateCharacterRequest} from "@/src/client/presentation/requests/CreateCharacterRequest";
import {
    CreateCharacterUseCaseRequest
} from "@/src/client/application/usecases/CreateCharacter/CreateCharacterUseCaseRequest";
import {CreateCharacterUseCase} from "@/src/client/application/usecases/CreateCharacter/CreateCharacterUseCase";

export interface ICreateCharacterController {
    createCharacter(request: CreateCharacterRequest): Promise<void>;
}

export const useCreateCharacterController = (): ICreateCharacterController => {
    const repository = useDependency('characterRepository');
    const useCase = CreateCharacterUseCase(repository);

    return {
        createCharacter: async (request: CreateCharacterUseCaseRequest) => {
            // Verify that the request is valid
            const characterToCreate: CreateCharacterUseCaseRequest = {
                name: request.name,
                homeworld: request.homeworld,
                species: request.species
            };

            await useCase.execute(characterToCreate);
        }
    };
}