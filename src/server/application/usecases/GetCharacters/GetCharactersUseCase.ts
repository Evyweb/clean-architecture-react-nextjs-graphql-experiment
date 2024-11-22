import {ICharacterRepository} from "@/src/server/application/ports/ICharacterRepository";
import {IGetCharactersPresenter} from "@/src/server/application/ports/IGetCharactersPresenter";
import {IGetCharactersUseCase} from "@/src/server/application/ports/IGetCharactersUseCase";
import {GetCharactersUseCaseResponse} from "@/src/server/application/usecases/GetCharacters/GetCharactersUseCaseResponse";

interface Dependencies {
    characterRepository: ICharacterRepository;
}

export const GetCharactersUseCase = ({characterRepository}: Dependencies): IGetCharactersUseCase => {
    return {
        async execute(presenter: IGetCharactersPresenter): Promise<void> {
            const characters = await characterRepository.getAll();
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