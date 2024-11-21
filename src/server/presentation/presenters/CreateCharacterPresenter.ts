import {Character} from "@/src/server/domain/Character";
import {ICreateCharacterPresenter} from "@/src/server/application/ports/driven/ICreateCharacterPresenter";
import {CreateCharacterViewModel} from "@/src/server/presentation/viewModels/CreateCharacterViewModel";

export class CreateCharacterPresenter implements ICreateCharacterPresenter {
    private viewModel: CreateCharacterViewModel = {
        createdCharacter: {
            id: '',
            name: '',
            species: '',
            homeworld: '',
        }
    };

    presentCharacter(character: Character): void {
        this.viewModel.createdCharacter = {
            id: character.id,
            name: character.name,
            species: character.species,
            homeworld: character.homeworld,
        };
    }

    getViewModel(): CreateCharacterViewModel {
        return this.viewModel;
    }
}