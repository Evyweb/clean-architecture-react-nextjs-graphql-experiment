import {CreateCharacterUseCaseRequest} from "@/src/client/application/usecases/CreateCharacter/CreateCharacterUseCaseRequest";

export interface ICreateCharacterUseCase {
    execute(characterToCreate: CreateCharacterUseCaseRequest): Promise<void>;
}