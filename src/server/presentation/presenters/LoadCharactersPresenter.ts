import {ILoadCharactersPresenter} from "@/src/server/application/ports/driven/ILoadCharactersPresenter";
import {Character} from "@/src/server/domain/Character";
import {GetCharactersViewModel} from "@/src/server/presentation/viewModels/GetCharactersViewModel";

export class LoadCharactersPresenter implements ILoadCharactersPresenter {
    private viewModel: GetCharactersViewModel = {
        characters: []
    };

    presentCharacters(characters: Character[]): void {
        this.viewModel.characters = characters.map(character => ({
            id: character.id,
            name: character.name,
            species: character.species,
            homeworld: character.homeworld,
        }));
    }

    getViewModel(): GetCharactersViewModel {
        return this.viewModel;
    }
}