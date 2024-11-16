import {Character} from "@/src/client/domain/Character";
import {LoadCharactersViewModel} from "@/src/client/presentation/viewModels/LoadCharactersViewModel";

export interface ILoadCharactersPresenter {
    presentCharacters(characters: Character[]): void;

    getViewModel(): LoadCharactersViewModel;
}