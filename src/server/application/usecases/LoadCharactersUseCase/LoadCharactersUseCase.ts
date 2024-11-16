import {CharacterRepository} from "@/src/server/application/ports/driven/CharacterRepository";
import {ILoadCharactersPresenter} from "@/src/server/application/ports/driven/ILoadCharactersPresenter";
import {IGetCharactersUseCase} from "@/src/server/application/ports/driver/IGetCharactersUseCase";

export class LoadCharactersUseCase implements IGetCharactersUseCase {
    constructor(
        private readonly characterRepository: CharacterRepository,
    ) {
    }

    async execute(presenter: ILoadCharactersPresenter): Promise<void> {
        const characters = await this.characterRepository.getAll();
        presenter.presentCharacters(characters);
    }
}