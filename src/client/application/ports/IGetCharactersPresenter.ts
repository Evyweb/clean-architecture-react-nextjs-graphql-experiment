import {
    GetCharactersUseCaseResponse
} from "@/src/client/application/usecases/GetCharacters/GetCharactersUseCaseResponse";

export interface IGetCharactersPresenter {
    present(response: GetCharactersUseCaseResponse): void;

    getViewModel<T>(): T;
}