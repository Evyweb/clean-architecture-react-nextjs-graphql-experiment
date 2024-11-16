import {CreateCharacterRequest} from "@/src/client/presentation/requests/CreateCharacterRequest";
import {CreateCharacterDTO} from "@/src/client/application/usecases/CreateCharacter/CreateCharacterDTO";
import {useDependency} from "@/src/client/presentation/hooks/useDependency";

export interface ICreateCharacterController {
    createCharacter(request: CreateCharacterRequest): Promise<void>;
}

export const useCreateCharacterController = (): ICreateCharacterController => {
    const useCase = useDependency('createCharacterUseCase');

    return {
        createCharacter: async (request: CreateCharacterRequest) => {
            // Verify that the request is valid
            const characterToCreate: CreateCharacterDTO = {
                name: request.name,
                homeworld: request.homeworld,
                species: request.species
            };

            await useCase.execute(characterToCreate);
        }
    };
}