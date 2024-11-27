import {Container} from "@evyweb/ioctopus";
import {DI_SYMBOLS} from "@/src/server/DependencyInjection";
import {ICreateCharacterController} from "@/src/server/presentation/controllers/CreateCharacterController";
import {CreateCharacterViewModel} from "@/src/server/presentation/viewModels/CreateCharacterViewModel";
import {FakeIdentityProvider} from "@/src/server/specs/fakes/FakeIdentityProvider";
import {createTestingContainer} from "@/src/server/specs/utils/TestingContainer";

describe('CreateCharacterController', () => {
    let container: Container;

    beforeEach(() => {
        container = createTestingContainer();
    });

    it('should successfully create the given character', async () => {
        // Arrange
        const idProvider = container.get<FakeIdentityProvider>(DI_SYMBOLS.IDENTITY_PROVIDER);
        const controller = container.get<ICreateCharacterController>(DI_SYMBOLS.CREATE_CHARACTER_CONTROLLER);
        idProvider.setNextValue("ef598875-cf20-4ac3-be72-db18d024e83b");

        // Act
        const viewModel = await controller.createCharacter({
            homeworld: "Tatooine",
            name: "Luke Skywalker",
            species: "Human",
        });

        // Assert
        expect(viewModel).toEqual<CreateCharacterViewModel>({
            createdCharacter: {
                homeworld: "Tatooine",
                id: "ef598875-cf20-4ac3-be72-db18d024e83b",
                name: "Luke Skywalker",
                species: "Human",
            },
        });
    });
});