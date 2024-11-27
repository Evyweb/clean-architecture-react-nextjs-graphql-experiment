import {Container} from "@evyweb/ioctopus";
import {createTestingContainer, DI_SYMBOLS} from "@/src/client/specs/utils/TestingContainer";
import {IGetCharactersController} from "@/src/client/presentation/controllers/GetCharacters/GetCharactersController";
import {setupServer} from "msw/node";
import {mockGraphQLQuery} from "@/src/client/specs/utils/mockGraphQLQuery";
import {GET_CHARACTERS} from "@/src/client/infrastructure/queries";
import {GetCharactersViewModel} from "@/src/client/presentation/viewModels/GetCharactersViewModel";

describe('GetCharactersController', () => {
    let container: Container;
    const endpoint = 'http://localhost:3000/api/graphql';

    const server = setupServer();

    beforeAll(() => server.listen());

    beforeEach(() => {
        container = createTestingContainer();
    });

    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    it('should display all characters', async () => {
        // Arrange
        mockGraphQLQuery({
            server,
            endpoint,
            query: GET_CHARACTERS,
            fakeResponse: {
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
            }
        });

        const controller = container.get<IGetCharactersController>(DI_SYMBOLS.GET_CHARACTERS_CONTROLLER);

        // Act
        const characters = await controller.getCharacters();

        // Assert
        expect(characters).toEqual<GetCharactersViewModel>({
            characters: [
                {
                    id: "1",
                    name: "Luke Skywalker",
                    description: "Human from Tatooine",
                    loadedFrom: "Data refreshed after the mutation",
                },
                {
                    id: "2",
                    name: "C-3PO",
                    description: "Droid from Tatooine",
                    loadedFrom: "Data refreshed after the mutation",
                },
            ],
        });
    });
});