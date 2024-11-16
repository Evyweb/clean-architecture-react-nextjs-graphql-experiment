import {IGetCharactersUseCase} from "@/src/server/application/ports/driver/IGetCharactersUseCase";
import {LoadCharactersPresenter} from "@/src/server/presentation/presenters/LoadCharactersPresenter";
import {CreateCharacterRequest} from "@/src/server/presentation/requests/CreateCharacterRequest";
import {ICreateCharacterUseCase} from "@/src/server/application/ports/driver/ICreateCharacterUseCase";
import {CreateCharacterPresenter} from "@/src/server/presentation/presenters/CreateCharacterPresenter";
import {CharacterViewModel} from "@/src/server/presentation/viewModels/CharacterViewModel";
import {CreatedCharacterViewModel} from "@/src/server/presentation/viewModels/CreatedCharacterViewModel";

export class CharactersController {
    constructor(
        private readonly getCharactersUseCase: IGetCharactersUseCase,
        private readonly createCharacterUseCase: ICreateCharacterUseCase,
    ) {
    }

    async getCharacters(): Promise<CharacterViewModel[]> {
        const presenter = new LoadCharactersPresenter();
        await this.getCharactersUseCase.execute(presenter);
        return presenter.getViewModels();
    }

    async createCharacter(request: CreateCharacterRequest): Promise<CreatedCharacterViewModel> {
        const presenter = new CreateCharacterPresenter();
        // Validate request here
        const createCharacterDTO = {
            name: request.name,
            species: request.species,
            homeworld: request.homeworld,
        };
        await this.createCharacterUseCase.execute(createCharacterDTO, presenter);
        return presenter.getViewModel();
    }
}