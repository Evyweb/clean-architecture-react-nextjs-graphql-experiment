import {GetCharactersUseCaseResponse} from "@/src/server/application/usecases/GetCharacters/GetCharactersUseCaseResponse";

export interface IGetCharactersPresenter {
    present(response: GetCharactersUseCaseResponse): void;

    getViewModel<T>(): T;
}