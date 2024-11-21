import {Character} from "@/src/server/domain/Character";

export interface ICreateCharacterPresenter<T> {
    presentCharacter(character: Character): void;

    getViewModel(): T;
}