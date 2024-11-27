import {Container} from "@evyweb/ioctopus";
import {createTestingContainer} from "@/src/server/specs/utils/TestingContainer";
import {DI_SYMBOLS} from "@/src/server/DependencyInjection";
import {ICharacterRepository} from "@/src/server/application/ports/ICharacterRepository";
import {ILoadCharactersController} from "@/src/server/presentation/controllers/LoadCharactersController";
import {LoadCharactersViewModel} from "@/src/server/presentation/viewModels/LoadCharactersViewModel";

describe('LoadCharactersController', () => {
    let container: Container;

    beforeEach(() => {
        container = createTestingContainer();
    });

    it('should load all existing characters in the correct order', async () => {
        // Arrange
        const repository = container.get<ICharacterRepository>(DI_SYMBOLS.CHARACTER_REPOSITORY);
        await repository.add({id: '1', name: 'Luke Skywalker', species: 'Human', homeworld: 'Tatooine'});
        await repository.add({id: '2', name: 'Darth Vader', species: 'Human', homeworld: 'Tatooine'});
        await repository.add({id: '3', name: 'Yoda', species: 'Yoda', homeworld: 'Dagobah'});

        const controller = container.get<ILoadCharactersController>(DI_SYMBOLS.LOAD_CHARACTERS_CONTROLLER);

        // Act
        const viewModel = await controller.loadCharacters()

        // Assert
        expect(viewModel).toEqual<LoadCharactersViewModel>({
            characters: [
                {
                    description: "Yoda from Dagobah",
                    id: "3",
                    loadedFrom: "Data provided by the Server Component ",
                    name: "Yoda",
                },
                {
                    description: "Human from Tatooine",
                    id: "2",
                    loadedFrom: "Data provided by the Server Component ",
                    name: "Darth Vader",
                },
                {
                    description: "Human from Tatooine",
                    id: "1",
                    loadedFrom: "Data provided by the Server Component ",
                    name: "Luke Skywalker",
                },
            ],
        });
    });
});