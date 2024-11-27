import {setupServer} from 'msw/node'
import {fetchGraphQL} from "@/src/client/infrastructure/fetchGraphQL";
import {CREATE_CHARACTER, GET_CHARACTERS} from "@/src/client/infrastructure/queries";
import {mockGraphQLQuery} from "@/src/client/specs/utils/mockGraphQLQuery";

describe('fetchGraphQL', () => {

    const endpoint = 'http://localhost:3000/api/graphql';

    const server = setupServer();

    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    describe('When the graphQL request is a query', () => {
        it('should successfully fetch data', async () => {
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

            // Act
            const result = await fetchGraphQL(endpoint, GET_CHARACTERS);

            // Assert
            expect(result).toEqual({
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

    describe('When the graphQL request is a mutation', () => {
        it('should successfully fetch data', async () => {
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

            // Act
            const result = await fetchGraphQL(endpoint, CREATE_CHARACTER, {
                name: 'Luke Skywalker',
                species: 'Human',
                homeworld: 'Tatooine'
            });

            // Assert
            expect(result).toEqual({
                id: '1',
                name: 'Luke Skywalker',
                species: 'Human',
                homeworld: 'Tatooine'
            });
        });
    });

    describe('When the request is passed with errors', () => {
        it('should throw an error', async () => {
            mockGraphQLQuery({
                server,
                endpoint,
                query: GET_CHARACTERS,
                fakeResponse: {}
            });

            await expect(fetchGraphQL(endpoint, 'INVALID_QUERY')).rejects.toThrow('Invalid request');
        });
    });
})