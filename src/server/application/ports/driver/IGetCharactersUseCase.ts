import {ILoadCharactersPresenter} from "@/src/server/application/ports/driven/ILoadCharactersPresenter";

export interface IGetCharactersUseCase {
    execute(presenter: ILoadCharactersPresenter): Promise<void>;
}