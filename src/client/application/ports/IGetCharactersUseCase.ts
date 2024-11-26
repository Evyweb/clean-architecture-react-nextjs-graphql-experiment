import {IGetCharactersPresenter} from "@/src/client/application/ports/IGetCharactersPresenter";

export interface IGetCharactersUseCase {
    execute: (presenter: IGetCharactersPresenter) => Promise<void>;
}
