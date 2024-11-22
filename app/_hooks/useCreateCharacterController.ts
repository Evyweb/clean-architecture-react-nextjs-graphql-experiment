import {useDependency} from "@/app/_hooks/useDependency";
import {CreateCharacterRequest} from "@/src/client/presentation/requests/CreateCharacterRequest";
import {CreateCharacterUseCase} from "@/src/client/application/usecases/CreateCharacter/CreateCharacterUseCase";
import {CreateCharacterController} from "@/src/client/presentation/controllers/CreateCharacterController";

export interface ICreateCharacterController {
    createCharacter(request: CreateCharacterRequest): Promise<void>;
}

export const useCreateCharacterController = (): ICreateCharacterController => {
    const repository = useDependency('characterRepository');
    const useCase = CreateCharacterUseCase(repository);

    return CreateCharacterController(useCase);
}