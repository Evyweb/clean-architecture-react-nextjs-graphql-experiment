import {IGetCharactersPresenter} from "@/src/client/application/ports/IGetCharactersPresenter";

import {GetCharactersViewModel} from "@/src/client/presentation/viewModels/GetCharactersViewModel";
import {
    GetCharactersUseCaseResponse
} from "@/src/client/application/usecases/GetCharacters/GetCharactersUseCaseResponse";

export const GetCharactersPresenter = (): IGetCharactersPresenter => {
    const viewModel: GetCharactersViewModel = {
        characters: []
    };

    return {
        present({characters}: GetCharactersUseCaseResponse): void {
            viewModel.characters = characters.map(character => ({
                id: character.id,
                name: character.name,
                description: `${character.species} from ${character.homeworld}`,
                loadedFrom: 'Data refreshed after the mutation'
            }));
        },
        getViewModel<T>(): T {
            return viewModel as T;
        }
    };
}