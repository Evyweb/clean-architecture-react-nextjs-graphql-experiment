import {setupServer} from "msw/node";
import {Container} from "@evyweb/ioctopus";
import {createTestingContainer, DI_SYMBOLS} from "@/src/client/specs/utils/TestingContainer";
import {CREATE_CHARACTER} from "@/src/client/infrastructure/queries";
import {
    ICreateCharacterController
} from "@/src/client/presentation/controllers/CreateCharacter/CreateCharacterController";
import {mockGraphQLQuery} from "@/src/client/specs/utils/mockGraphQLQuery";

describe('CreateCharactersController', () => {
    let container: Container;
    const endpoint = 'http://localhost:3000/api/graphql';

    const server = setupServer();

    beforeAll(() => server.listen());

    beforeEach(() => {
        container = createTestingContainer();
    });

    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    it('should successfully create the given character', async () => {
        // Arrange
        mockGraphQLQuery({
            server,
            endpoint,
            query: CREATE_CHARACTER,
            variables: {
                name: 'Luke Skywalker',
                species: 'Human',
                homeworld: 'Tatooine'
            },
            fakeResponse: {
                id: '1',
                name: 'Luke Skywalker',
                species: 'Human',
                homeworld: 'Tatooine'
            }
        });

        const controller = container.get<ICreateCharacterController>(DI_SYMBOLS.CREATE_CHARACTER_CONTROLLER);

        // Act & Assert
        expect(() => controller.createCharacter({
            name: "Luke Skywalker",
            species: "Human",
            homeworld: "Tatooine"
        })).not.toThrow();
    });
});