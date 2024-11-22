import {useDependency} from "@/src/client/presentation/hooks/useDependency";
import {GetCharactersPresenter} from "@/src/client/presentation/presenters/GetCharactersPresenter";

import {GetCharactersViewModel} from "@/src/client/presentation/viewModels/GetCharactersViewModel";
import {GetCharactersUseCase} from "@/src/client/application/usecases/GetCharacters/GetCharactersUseCase";

export interface IGetCharactersController {
    getCharacters(): GetCharactersViewModel;
}

export const useGetCharactersController = (): IGetCharactersController => {
    const repository = useDependency('characterRepository');
    const useCase = GetCharactersUseCase(repository);

    return {
        getCharacters(): GetCharactersViewModel {
            const presenter = GetCharactersPresenter();
            useCase.execute(presenter);
            return presenter.getViewModel();
        }
    };
}