import {GetCharactersViewModel} from "@/src/server/presentation/viewModels/GetCharactersViewModel";
import {Container} from "@evyweb/ioctopus";
import {createTestingContainer} from "@/src/server/specs/utils/TestingContainer";
import {DI_SYMBOLS} from "@/src/server/DependencyInjection";
import {IGetCharactersController} from "@/src/server/presentation/controllers/GetCharactersController";
import {ICharacterRepository} from "@/src/server/application/ports/ICharacterRepository";

describe('GetCharactersController', () => {
    let container: Container;

    beforeEach(() => {
        container = createTestingContainer();
    });

    it('should display all existing characters in the correct order', async () => {
        // Arrange
        const repository = container.get<ICharacterRepository>(DI_SYMBOLS.CHARACTER_REPOSITORY);
        await repository.add({id: '1', name: 'Luke Skywalker', species: 'Human', homeworld: 'Tatooine'});
        await repository.add({id: '2', name: 'Darth Vader', species: 'Human', homeworld: 'Tatooine'});
        await repository.add({id: '3', name: 'Yoda', species: 'Yoda', homeworld: 'Dagobah'});

        const controller = container.get<IGetCharactersController>(DI_SYMBOLS.GET_CHARACTERS_CONTROLLER);

        // Act
        const viewModel = await controller.getCharacters()

        // Assert
        expect(viewModel).toEqual<GetCharactersViewModel>({
            characters: [
                {
                    homeworld: "Dagobah",
                    id: "3",
                    name: "Yoda",
                    species: "Yoda",
                },
                {
                    homeworld: "Tatooine",
                    id: "2",
                    name: "Darth Vader",
                    species: "Human",
                },
                {
                    homeworld: "Tatooine",
                    id: "1",
                    name: "Luke Skywalker",
                    species: "Human",
                }
            ],
        });
    });
});