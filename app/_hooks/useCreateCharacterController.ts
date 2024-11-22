import {useDependency} from "@/app/_hooks/useDependency";
import {CreateCharacterUseCase} from "@/src/client/application/usecases/CreateCharacter/CreateCharacterUseCase";
import {CreateCharacterController} from "@/src/client/presentation/controllers/CreateCharacter/CreateCharacterController";
import {CreateCharacterRequest} from "@/src/server/presentation/requests/CreateCharacterRequest";

export interface ICreateCharacterController {
    createCharacter(request: CreateCharacterRequest): Promise<void>;
}

export const useCreateCharacterController = (): ICreateCharacterController => {
    const repository = useDependency('characterRepository');
    const useCase = CreateCharacterUseCase(repository);
    return CreateCharacterController(useCase);
}