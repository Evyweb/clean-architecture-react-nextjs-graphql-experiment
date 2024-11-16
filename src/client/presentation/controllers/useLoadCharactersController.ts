import {useDependency} from "@/src/client/presentation/hooks/useDependency";
import {LoadCharactersPresenter} from "@/src/client/presentation/presenters/LoadCharactersPresenter";
import {LoadCharactersViewModel} from "@/src/client/presentation/viewModels/LoadCharactersViewModel";

export interface ILoadCharactersController {
    loadCharacters(): LoadCharactersViewModel;
}

export const useLoadCharactersController = (): ILoadCharactersController => {
    const useCase = useDependency('loadCharactersUseCase');

    return {
        loadCharacters(): LoadCharactersViewModel {
            const presenter = LoadCharactersPresenter();
            useCase.execute(presenter);
            return presenter.getViewModel();
        }
    };

}