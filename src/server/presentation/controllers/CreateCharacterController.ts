import {CreateCharacterRequest} from "@/src/server/presentation/requests/CreateCharacterRequest";
import {CreateCharacterViewModel} from "@/src/server/presentation/viewModels/CreateCharacterViewModel";
import {CreateCharacterPresenter} from "@/src/server/presentation/presenters/CreateCharacterPresenter";
import {ICreateCharacterUseCase} from "@/src/server/application/ports/ICreateCharacterUseCase";

export interface ICreateCharacterController {
    createCharacter(request: CreateCharacterRequest): Promise<CreateCharacterViewModel>;
}

interface Dependencies {
    createCharacterUseCase: ICreateCharacterUseCase;
}

export const CreateCharacterController = ({createCharacterUseCase}: Dependencies): ICreateCharacterController => {
    return {
        async createCharacter(request: CreateCharacterRequest): Promise<CreateCharacterViewModel> {
            const presenter = CreateCharacterPresenter();
            // Validate request here
            const createCharacterDTO = {
                name: request.name,
                species: request.species,
                homeworld: request.homeworld,
            };
            await createCharacterUseCase.execute(createCharacterDTO, presenter);
            return presenter.getViewModel();
        }
    }
}