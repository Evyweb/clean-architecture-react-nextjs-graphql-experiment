import {IGetCharactersPresenter} from "@/src/server/application/ports/IGetCharactersPresenter";
import {GetCharactersViewModel} from "@/src/server/presentation/viewModels/GetCharactersViewModel";
import {
    GetCharactersUseCaseResponse
} from "@/src/server/application/usecases/GetCharacters/GetCharactersUseCaseResponse";

export const GetCharactersPresenter = (): IGetCharactersPresenter => {
    const viewModel: GetCharactersViewModel = {
        characters: []
    };

    return {
        present({characters}: GetCharactersUseCaseResponse): void {
            viewModel.characters = characters.reverse().map(character => ({
                id: character.id,
                name: character.name,
                species: character.species,
                homeworld: character.homeworld
            }));
        },
        getViewModel<T>(): T {
            return viewModel as T;
        }
    };
}