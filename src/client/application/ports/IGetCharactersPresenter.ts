import {Character} from "@/src/client/domain/Character";

export interface IGetCharactersPresenter {
    presentCharacters(characters: Character[]): void;

    getViewModel<T>(): T;
}