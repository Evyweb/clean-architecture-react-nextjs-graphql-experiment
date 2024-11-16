import {CreateCharacterDTO} from "@/src/server/application/usecases/CreateCharacterUseCase/CreateCharacterDTO";
import {ICreateCharacterPresenter} from "@/src/server/application/ports/driven/ICreateCharacterPresenter";

export interface ICreateCharacterUseCase {
    execute(characterToCreate: CreateCharacterDTO, presenter: ICreateCharacterPresenter): Promise<void>;
}