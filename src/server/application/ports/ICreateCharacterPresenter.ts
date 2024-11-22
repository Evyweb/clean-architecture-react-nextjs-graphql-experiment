import {CreateCharacterUseCaseResponse} from "@/src/server/application/usecases/CreateCharacter/CreateCharacterUseCaseResponse";

export interface ICreateCharacterPresenter {
    present(response: CreateCharacterUseCaseResponse): void;

    getViewModel<T>(): T;
}