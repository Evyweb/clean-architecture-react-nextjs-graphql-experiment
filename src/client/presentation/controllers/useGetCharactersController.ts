import {useDependency} from "@/src/client/presentation/hooks/useDependency";
import {GetCharactersPresenter} from "@/src/client/presentation/presenters/GetCharactersPresenter";

import {GetCharactersViewModel} from "@/src/client/presentation/viewModels/GetCharactersViewModel";

export interface IGetCharactersController {
    getCharacters(): GetCharactersViewModel;
}

export const useGetCharactersController = (): IGetCharactersController => {
    const useCase = useDependency('getCharactersUseCase');

    return {
        getCharacters(): GetCharactersViewModel {
            const presenter = GetCharactersPresenter();
            useCase.execute(presenter);
            return presenter.getViewModel();
        }
    };

}