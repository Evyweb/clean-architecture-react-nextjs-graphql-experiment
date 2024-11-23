import {CreateCharacterUseCase} from "@/src/client/application/usecases/CreateCharacter/CreateCharacterUseCase";
import {
    CreateCharacterController,
    CreateCharacterControllerRequest
} from "@/src/client/presentation/controllers/CreateCharacter/CreateCharacterController";
import {ICharacterRepository} from "@/src/client/application/ports/ICharacterRepository";

export interface ICreateCharacterController {
    createCharacter(request: CreateCharacterControllerRequest): Promise<void>;
}

export const useCreateCharacterController = (repository: ICharacterRepository): ICreateCharacterController => {
    const useCase = CreateCharacterUseCase(repository);
    return CreateCharacterController(useCase);
}