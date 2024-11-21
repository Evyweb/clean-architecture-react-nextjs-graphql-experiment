import {IGetCharactersUseCase} from "@/src/server/application/ports/driver/IGetCharactersUseCase";
import {LoadCharactersPresenter} from "@/src/server/presentation/presenters/LoadCharactersPresenter";
import {CreateCharacterRequest} from "@/src/server/presentation/requests/CreateCharacterRequest";
import {ICreateCharacterUseCase} from "@/src/server/application/ports/driver/ICreateCharacterUseCase";
import {CreateCharacterPresenter} from "@/src/server/presentation/presenters/CreateCharacterPresenter";
import {CreateCharacterViewModel} from "@/src/server/presentation/viewModels/CreateCharacterViewModel";
import {GetCharactersViewModel} from "@/src/server/presentation/viewModels/GetCharactersViewModel";

export class CharactersController {
    constructor(
        private readonly getCharactersUseCase: IGetCharactersUseCase,
        private readonly createCharacterUseCase: ICreateCharacterUseCase,
    ) {
    }

    async getCharacters(): Promise<GetCharactersViewModel> {
        const presenter = new LoadCharactersPresenter();
        await this.getCharactersUseCase.execute(presenter);
        return presenter.getViewModel();
    }

    async createCharacter(request: CreateCharacterRequest): Promise<CreateCharacterViewModel> {
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