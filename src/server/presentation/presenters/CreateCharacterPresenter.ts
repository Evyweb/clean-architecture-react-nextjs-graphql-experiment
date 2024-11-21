import {Character} from "@/src/server/domain/Character";
import {ICreateCharacterPresenter} from "@/src/server/application/ports/ICreateCharacterPresenter";
import {CreateCharacterViewModel} from "@/src/server/presentation/viewModels/CreateCharacterViewModel";

export const CreateCharacterPresenter = (): ICreateCharacterPresenter => {
    const viewModel: CreateCharacterViewModel = {
        createdCharacter: {
            id: '',
            name: '',
            species: '',
            homeworld: '',
        }
    };

    return {
        presentCharacter(character: Character): void {
            viewModel.createdCharacter = {
                id: character.id,
                name: character.name,
                species: character.species,
                homeworld: character.homeworld,
            };
        },

        getViewModel<T>(): T {
            return viewModel as T;
        }
    }
}