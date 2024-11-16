import {ILoadCharactersUseCase} from "@/src/client/application/ports/driver/ILoadCharactersUseCase";
import {useDependency} from "@/src/client/presentation/hooks/useDependency";
import {ILoadCharactersPresenter} from "@/src/client/application/ports/driven/ILoadCharactersPresenter";

export const useLoadCharactersUseCase = (): ILoadCharactersUseCase => {
    const repository = useDependency('characterRepository');

    return {
        execute: (presenter: ILoadCharactersPresenter): void => {
            const characters = repository.getAll();
            presenter.presentCharacters(characters);
        }
    };
}