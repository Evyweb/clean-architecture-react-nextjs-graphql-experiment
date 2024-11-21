import {GetCharactersViewModel} from "@/src/server/presentation/viewModels/GetCharactersViewModel";
import {GetCharactersPresenter} from "@/src/server/presentation/presenters/GetCharactersPresenter";
import {IGetCharactersUseCase} from "@/src/server/application/ports/IGetCharactersUseCase";

export interface IGetCharactersController {
    getCharacters(): Promise<GetCharactersViewModel>;
}

interface Dependencies {
    getCharactersUseCase: IGetCharactersUseCase;
}

export const GetCharactersController = ({getCharactersUseCase}: Dependencies): IGetCharactersController => {
    return {
        async getCharacters(): Promise<GetCharactersViewModel> {
            const presenter = GetCharactersPresenter();
            await getCharactersUseCase.execute(presenter);
            return presenter.getViewModel();
        }
    };
}