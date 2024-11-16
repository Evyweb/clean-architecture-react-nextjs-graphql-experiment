import {ILoadCharactersPresenter} from "@/src/client/application/ports/driven/ILoadCharactersPresenter";
import {LoadCharactersViewModel} from "@/src/client/presentation/viewModels/LoadCharactersViewModel";
import {Character} from "@/src/client/domain/Character";

export const LoadCharactersPresenter = (): ILoadCharactersPresenter => {
    const viewModel: LoadCharactersViewModel = {
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
        getViewModel() {
            return viewModel;
        }
    };

}