import {Character} from "@/src/server/domain/Character";

export interface ILoadCharactersPresenter {
    presentCharacters(characters: Character[]): void;
}