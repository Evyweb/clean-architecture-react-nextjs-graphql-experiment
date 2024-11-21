import {ICreateCharacterPresenter} from "@/src/server/application/ports/ICreateCharacterPresenter";

export interface CreateCharacterUseCaseRequest {
    name: string;
    species: string;
    homeworld: string;
}

export interface ICreateCharacterUseCase {
    execute(characterToCreate: CreateCharacterUseCaseRequest, presenter: ICreateCharacterPresenter): Promise<void>;
}