import {useDependency} from "@/src/client/presentation/hooks/useDependency";
import {CreateCharacterRequest} from "@/src/client/presentation/requests/CreateCharacterRequest";
import {CreateCharacterUseCaseRequest} from "@/src/client/application/usecases/CreateCharacter/CreateCharacterUseCaseRequest";

export interface ICreateCharacterController {
    createCharacter(request: CreateCharacterRequest): Promise<void>;
}

export const useCreateCharacterController = (): ICreateCharacterController => {
    const useCase = useDependency('createCharacterUseCase');

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