import {ICreateCharacterPresenter} from "@/src/server/application/ports/ICreateCharacterPresenter";
import {CreateCharacterViewModel} from "@/src/server/presentation/viewModels/CreateCharacterViewModel";
import {CreateCharacterUseCaseResponse} from "@/src/server/application/usecases/CreateCharacter/CreateCharacterUseCaseResponse";

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
        present({createdCharacter}: CreateCharacterUseCaseResponse): void {
            viewModel.createdCharacter = {
                id: createdCharacter.id,
                name: createdCharacter.name,
                species: createdCharacter.species,
                homeworld: createdCharacter.homeworld,
            };
        },

        getViewModel<T>(): T {
            return viewModel as T;
        }
    }
}