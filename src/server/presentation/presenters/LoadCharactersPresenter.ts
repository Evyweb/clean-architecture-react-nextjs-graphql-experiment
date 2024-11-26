import {IGetCharactersPresenter} from "@/src/server/application/ports/IGetCharactersPresenter";
import {
    GetCharactersUseCaseResponse
} from "@/src/server/application/usecases/GetCharacters/GetCharactersUseCaseResponse";
import {LoadCharactersViewModel} from "@/src/server/presentation/viewModels/LoadCharactersViewModel";

export const LoadCharactersPresenter = (): IGetCharactersPresenter => {
    const viewModel: LoadCharactersViewModel = {
        characters: []
    };

    return {
        present({characters}: GetCharactersUseCaseResponse): void {
            viewModel.characters = characters.reverse().map(character => ({
                id: character.id,
                name: `[INITIAL] ${character.name}`,
                description: `${character.species} from ${character.homeworld}`
            }));
        },
        getViewModel<T>(): T {
            return viewModel as T;
        }
    };
}