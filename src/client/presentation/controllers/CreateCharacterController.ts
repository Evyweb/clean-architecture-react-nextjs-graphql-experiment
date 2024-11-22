import {
    CreateCharacterUseCaseRequest
} from "@/src/client/application/usecases/CreateCharacter/CreateCharacterUseCaseRequest";
import {ICreateCharacterUseCase} from "@/src/client/application/ports/ICreateCharacterUseCase";

interface ICreateCharacterController {
    createCharacter(request: CreateCharacterUseCaseRequest): Promise<void>;
}

export const CreateCharacterController = (useCase: ICreateCharacterUseCase): ICreateCharacterController => {
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
    }
}