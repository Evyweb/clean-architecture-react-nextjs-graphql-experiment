import {IGetCharactersPresenter} from "@/src/client/application/ports/IGetCharactersPresenter";
import {Character} from "@/src/client/domain/Character";

import {GetCharactersViewModel} from "@/src/client/presentation/viewModels/GetCharactersViewModel";

export const GetCharactersPresenter = (): IGetCharactersPresenter => {
    const viewModel: GetCharactersViewModel = {
        characters: []
    };

    return {
        presentCharacters(characters: Character[]): void {
            viewModel.characters = characters.map(character => ({
                id: character.id,
                name: character.name,
                description: `${character.species} from ${character.homeworld}`
            }));
        },
        getViewModel<T>(): T {
            return viewModel as T;
        }
    };
}