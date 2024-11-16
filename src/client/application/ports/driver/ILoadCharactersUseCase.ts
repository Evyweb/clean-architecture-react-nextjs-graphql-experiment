import {ILoadCharactersPresenter} from "@/src/client/application/ports/driven/ILoadCharactersPresenter";

export interface ILoadCharactersUseCase {
    execute: (presenter: ILoadCharactersPresenter) => void;
}