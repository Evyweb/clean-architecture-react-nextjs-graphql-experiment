import {Character} from "@/src/server/domain/Character";
import {GetCharactersViewModel} from "@/src/server/presentation/viewModels/GetCharactersViewModel";

export interface ILoadCharactersPresenter {
    presentCharacters(characters: Character[]): void;

    getViewModel(): GetCharactersViewModel;
}