import {GetCharactersViewModel} from "@/src/client/presentation/viewModels/GetCharactersViewModel";
import {GetCharactersPresenter} from "@/src/client/presentation/presenters/GetCharactersPresenter";
import {IGetCharactersUseCase} from "@/src/client/application/ports/IGetCharactersUseCase";

export const GetCharactersController = (useCase: IGetCharactersUseCase) => {
    return {
        getCharacters(): GetCharactersViewModel {
            const presenter = GetCharactersPresenter();
            useCase.execute(presenter);
            return presenter.getViewModel();
        }
    };
}