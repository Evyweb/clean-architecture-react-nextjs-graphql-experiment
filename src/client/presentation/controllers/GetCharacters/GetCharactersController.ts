import {GetCharactersViewModel} from "@/src/client/presentation/viewModels/GetCharactersViewModel";
import {GetCharactersPresenter} from "@/src/client/presentation/presenters/GetCharactersPresenter";
import {IGetCharactersUseCase} from "@/src/client/application/ports/IGetCharactersUseCase";

export interface IGetCharactersController {
    getCharacters(): Promise<GetCharactersViewModel>;
}

export const GetCharactersController = (useCase: IGetCharactersUseCase) => {
    return {
        async getCharacters(): Promise<GetCharactersViewModel> {
            const presenter = GetCharactersPresenter();
            await useCase.execute(presenter);
            return presenter.getViewModel();
        }
    };
}