import {Character} from "@/src/server/domain/Character";

export interface ICreateCharacterPresenter {
    presentCharacter(character: Character): void;

    getViewModel<T>(): T;
}