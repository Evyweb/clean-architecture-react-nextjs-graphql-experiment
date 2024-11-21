import {Character} from "@/src/client/domain/Character";

export interface ILoadCharactersPresenter<T> {
    presentCharacters(characters: Character[]): void;

    getViewModel(): T;
}