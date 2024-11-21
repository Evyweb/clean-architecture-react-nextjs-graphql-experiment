import {Character} from "@/src/server/domain/Character";

export interface IGetCharactersPresenter {
    presentCharacters(characters: Character[]): void;

    getViewModel<T>(): T;
}