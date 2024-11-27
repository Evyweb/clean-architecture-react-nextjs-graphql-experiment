import {Container} from "@evyweb/ioctopus";
import {createTestingContainer} from "@/src/server/specs/utils/TestingContainer";
import {FakeIdentityProvider} from "@/src/server/specs/fakes/FakeIdentityProvider";
import {DI_SYMBOLS} from "@/src/server/DependencyInjection";
import {IGraphQLCharacterController} from "@/src/server/presentation/controllers/GraphQLCharacterController";
import {ICharacterRepository} from "@/src/server/application/ports/ICharacterRepository";

describe('GraphQLCharacterController', () => {
    let container: Container;

    beforeEach(() => {
        container = createTestingContainer();
    });

    it('should successfully create the given character', async () => {
        // Arrange
        const idProvider = container.get<FakeIdentityProvider>(DI_SYMBOLS.IDENTITY_PROVIDER);
        const controller = container.get<IGraphQLCharacterController>(DI_SYMBOLS.GRAPHQL_CHARACTER_CONTROLLER);
        idProvider.setNextValue("ef598875-cf20-4ac3-be72-db18d024e83b");

        // Act
        const viewModel = await controller.createCharacter({
            homeworld: "Tatooine",
            name: "Luke Skywalker",
            species: "Human",
        });

        // Assert
        expect(viewModel).toEqual({
            homeworld: "Tatooine",
            id: "ef598875-cf20-4ac3-be72-db18d024e83b",
            name: "Luke Skywalker",
            species: "Human",
        });
    });

    it('should successfully retrieve characters', async () => {
        // Arrange
        const repository = container.get<ICharacterRepository>(DI_SYMBOLS.CHARACTER_REPOSITORY);
        await repository.add({
            id: '11111111-1111-1111-1111-111111111111',
            name: 'Luke Skywalker',
            species: 'Human',
            homeworld: 'Tatooine'
        });
        await repository.add({
            id: '22222222-2222-2222-2222-222222222222',
            name: 'Darth Vader',
            species: 'Human',
            homeworld: 'Tatooine'
        });
        await repository.add({
            id: '33333333-3333-3333-3333-333333333333',
            name: 'Yoda',
            species: 'Yoda',
            homeworld: 'Dagobah'
        });

        const controller = container.get<IGraphQLCharacterController>(DI_SYMBOLS.GRAPHQL_CHARACTER_CONTROLLER);

        // Act
        const characters = await controller.characters();

        // Assert
        expect(characters).toEqual([{
            homeworld: "Dagobah",
            id: "33333333-3333-3333-3333-333333333333",
            name: "Yoda",
            species: "Yoda",
        }, {
            homeworld: "Tatooine",
            id: "22222222-2222-2222-2222-222222222222",
            name: "Darth Vader",
            species: "Human",
        }, {
            homeworld: "Tatooine",
            id: "11111111-1111-1111-1111-111111111111",
            name: "Luke Skywalker",
            species: "Human",
        }]);
    });
});