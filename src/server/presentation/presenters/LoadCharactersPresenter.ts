import {ILoadCharactersPresenter} from "@/src/server/application/ports/driven/ILoadCharactersPresenter";
import {Character} from "@/src/server/domain/Character";
import {CharacterViewModel} from "@/src/server/presentation/viewModels/CharacterViewModel";

export class LoadCharactersPresenter implements ILoadCharactersPresenter {
    private viewModels: CharacterViewModel[] = [];

    presentCharacters(characters: Character[]): void {
        this.viewModels = characters.map(character => ({
            id: character.id,
            name: character.name,
            species: character.species,
            homeworld: character.homeworld,
        }));
    }

    getViewModels(): CharacterViewModel[] {
        return this.viewModels;
    }
}