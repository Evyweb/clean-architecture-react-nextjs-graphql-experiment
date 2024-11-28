import {IGetCharactersPresenter} from "@/src/server/application/ports/IGetCharactersPresenter";
import {
    GetCharactersUseCaseResponse
} from "@/src/server/application/usecases/GetCharacters/GetCharactersUseCaseResponse";
import {LoadCharactersViewModel} from "@/src/server/presentation/viewModels/LoadCharactersViewModel";

export const CharactersListPresenter = (): IGetCharactersPresenter => {
    const viewModel: LoadCharactersViewModel = {
        loadingMessage: 'Loading characters...',
        errorMessage: 'An error occurred while loading characters',
        initialData: {
            characters: []
        }
    };

    return {
        present({characters}: GetCharactersUseCaseResponse): void {
            viewModel.initialData.characters = characters.reverse().map(character => ({
                id: character.id,
                name: character.name,
                description: `${character.species} from ${character.homeworld}`,
                loadedFrom: 'Data provided by the Server Component '
            }));
        },
        getViewModel<T>(): T {
            return viewModel as T;
        }
    };
}