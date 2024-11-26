import {IGetCharactersUseCase} from "@/src/server/application/ports/IGetCharactersUseCase";
import {LoadCharactersViewModel} from "@/src/server/presentation/viewModels/LoadCharactersViewModel";
import {LoadCharactersPresenter} from "@/src/server/presentation/presenters/LoadCharactersPresenter";

export interface ILoadCharactersController {
    loadCharacters(): Promise<LoadCharactersViewModel>;
}

interface Dependencies {
    getCharactersUseCase: IGetCharactersUseCase;
}

export const LoadCharactersController = ({getCharactersUseCase}: Dependencies): ILoadCharactersController => {
    return {
        async loadCharacters(): Promise<LoadCharactersViewModel> {
            const presenter = LoadCharactersPresenter();
            await getCharactersUseCase.execute(presenter);
            return presenter.getViewModel();
        }
    };
}