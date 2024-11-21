import {IGetCharactersPresenter} from "@/src/server/application/ports/IGetCharactersPresenter";
import {Character} from "@/src/server/domain/Character";
import {GetCharactersViewModel} from "@/src/server/presentation/viewModels/GetCharactersViewModel";

export const GetCharactersPresenter = (): IGetCharactersPresenter => {
    const viewModel: GetCharactersViewModel = {
        characters: []
    };

    return {
        presentCharacters(characters: Character[]): void {
            viewModel.characters = characters.map(character => ({
                id: character.id,
                name: character.name,
                species: character.species,
                homeworld: character.homeworld,
            }));
        },
        getViewModel<T>(): T {
            return viewModel as T;
        }
    };
}