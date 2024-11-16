import {Character} from "@/src/server/domain/Character";
import {ICreateCharacterPresenter} from "@/src/server/application/ports/driven/ICreateCharacterPresenter";
import {CreatedCharacterViewModel} from "@/src/server/presentation/viewModels/CreatedCharacterViewModel";

export class CreateCharacterPresenter implements ICreateCharacterPresenter {
    private viewModel: CreatedCharacterViewModel = {
        id: '',
        name: '',
        species: '',
        homeworld: '',
    };

    presentCharacter(character: Character): void {
        this.viewModel = {
            id: character.id,
            name: character.name,
            species: character.species,
            homeworld: character.homeworld,
        };
    }

    getViewModel(): CreatedCharacterViewModel {
        return this.viewModel;
    }
}