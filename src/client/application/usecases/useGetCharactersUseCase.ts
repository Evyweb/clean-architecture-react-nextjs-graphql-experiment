import {IGetCharactersUseCase} from "@/src/client/application/ports/IGetCharactersUseCase";
import {useDependency} from "@/src/client/presentation/hooks/useDependency";
import {IGetCharactersPresenter} from "@/src/client/application/ports/IGetCharactersPresenter";

export const useGetCharactersUseCase = (): IGetCharactersUseCase => {
    const repository = useDependency('characterRepository');

    return {
        execute: (presenter: IGetCharactersPresenter): void => {
            const characters = repository.getAll();
            presenter.presentCharacters(characters);
        }
    };
}