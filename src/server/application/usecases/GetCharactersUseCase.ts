import {ICharacterRepository} from "@/src/server/application/ports/ICharacterRepository";
import {IGetCharactersPresenter} from "@/src/server/application/ports/IGetCharactersPresenter";
import {IGetCharactersUseCase} from "@/src/server/application/ports/IGetCharactersUseCase";

interface Dependencies {
    characterRepository: ICharacterRepository;
}

export const GetCharactersUseCase = ({characterRepository}: Dependencies): IGetCharactersUseCase => {
    return {
        async execute(presenter: IGetCharactersPresenter): Promise<void> {
            const characters = await characterRepository.getAll();
            presenter.presentCharacters(characters);
        }
    };
}