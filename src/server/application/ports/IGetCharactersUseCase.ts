import {IGetCharactersPresenter} from "@/src/server/application/ports/IGetCharactersPresenter";

export interface IGetCharactersUseCase {
    execute(presenter: IGetCharactersPresenter): Promise<void>;
}