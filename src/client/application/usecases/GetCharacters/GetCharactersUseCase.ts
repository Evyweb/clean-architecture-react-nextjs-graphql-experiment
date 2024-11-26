import {IGetCharactersPresenter} from "@/src/client/application/ports/IGetCharactersPresenter";
import {
    GetCharactersUseCaseResponse
} from "@/src/client/application/usecases/GetCharacters/GetCharactersUseCaseResponse";
import {ICharacterRepository} from "@/src/client/application/ports/ICharacterRepository";
import {IGetCharactersUseCase} from "@/src/client/application/ports/IGetCharactersUseCase";

export const GetCharactersUseCase = (repository: ICharacterRepository): IGetCharactersUseCase => {
    return {
        execute: async (presenter: IGetCharactersPresenter): Promise<void> => {
            const characters = await repository.getAll();
            const response: GetCharactersUseCaseResponse = {
                characters: characters.map(character => ({
                    id: character.id,
                    name: character.name,
                    species: character.species,
                    homeworld: character.homeworld
                }))
            };
            presenter.present(response);
        }
    };
}