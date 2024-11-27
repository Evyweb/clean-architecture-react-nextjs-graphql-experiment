import {InMemoryCharacterRepository} from "@/src/client/specs/utils/fakes/InMemoryCharacterRepository";
import {CreateCharacterUseCase} from "@/src/client/application/usecases/CreateCharacter/CreateCharacterUseCase";

describe('CreateCharacterUseCase', () => {
    it('should create the given character', async () => {
        // Arrange
        const repository = InMemoryCharacterRepository([]);
        const useCase = CreateCharacterUseCase(repository);

        // Act
        await useCase.execute({
            name: 'Luke Skywalker',
            species: 'Human',
            homeworld: 'Tatooine'
        });

        // Assert
        const characters = await repository.getAll();
        expect(characters).toEqual([{
            id: '1',
            name: 'Luke Skywalker',
            species: 'Human',
            homeworld: 'Tatooine'
        }]);
    });
});