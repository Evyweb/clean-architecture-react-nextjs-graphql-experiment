import {ICreateCharacterPresenter} from "@/src/server/application/ports/ICreateCharacterPresenter";
import {CreateCharacterUseCaseRequest} from "@/src/server/application/usecases/CreateCharacter/CreateCharacterUseCaseRequest";

export interface ICreateCharacterUseCase {
    execute(characterToCreate: CreateCharacterUseCaseRequest, presenter: ICreateCharacterPresenter): Promise<void>;
}