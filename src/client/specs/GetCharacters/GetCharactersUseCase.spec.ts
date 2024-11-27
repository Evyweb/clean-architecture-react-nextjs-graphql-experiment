import {GetCharactersUseCase} from "@/src/client/application/usecases/GetCharacters/GetCharactersUseCase";
import {InMemoryCharacterRepository} from "@/src/client/specs/utils/fakes/InMemoryCharacterRepository";
import {IGetCharactersPresenter} from "@/src/client/application/ports/IGetCharactersPresenter";
import {mock} from "vitest-mock-extended";

describe('GetCharactersUseCase', () => {
    it('should retrieve all characters', async () => {
        // Arrange
        const repository = InMemoryCharacterRepository([
            {
                id: '1',
                name: 'Luke Skywalker',
                species: 'Human',
                homeworld: 'Tatooine'
            },
            {
                id: '2',
                name: 'C-3PO',
                species: 'Droid',
                homeworld: 'Tatooine'
            }
        ]);

        const useCase = GetCharactersUseCase(repository);
        const presenter = mock<IGetCharactersPresenter>();

        // Act
        await useCase.execute(presenter);

        // Assert
        expect(presenter.present).toBeCalledWith({
            characters: [{
                id: '1',
                name: 'Luke Skywalker',
                species: 'Human',
                homeworld: 'Tatooine'
            }, {
                id: '2',
                name: 'C-3PO',
                species: 'Droid',
                homeworld: 'Tatooine'
            }]
        });
    });
});