import {IGetCharactersUseCase} from "@/src/client/application/ports/IGetCharactersUseCase";
import {useDependency} from "@/src/client/presentation/hooks/useDependency";
import {IGetCharactersPresenter} from "@/src/client/application/ports/IGetCharactersPresenter";
import {
    GetCharactersUseCaseResponse
} from "@/src/client/application/usecases/GetCharacters/GetCharactersUseCaseResponse";

export const useGetCharactersUseCase = (): IGetCharactersUseCase => {
    const repository = useDependency('characterRepository');

    return {
        execute: (presenter: IGetCharactersPresenter): void => {
            const characters = repository.getAll();
            const response: GetCharactersUseCaseResponse = {
                characters: characters.map(character => ({
                    id: character.id,
                    name: character.name,
                    species: character.species,
                    homeworld: character.homeworld
                }))
            };
            presenter.present(response);
        }
    };
}