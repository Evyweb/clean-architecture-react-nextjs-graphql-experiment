import {Character} from "@/src/server/domain/Character";

export interface ILoadCharactersPresenter<T> {
    presentCharacters(characters: Character[]): void;

    getViewModels(): T;
}