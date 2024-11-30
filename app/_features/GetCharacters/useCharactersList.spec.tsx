import {CharactersListViewModel} from "@/src/client/presentation/viewModels/CharactersListViewModel";
import {useCharactersList} from "@/app/_features/GetCharacters/useCharactersList";
import {renderHook} from "@testing-library/react";
import {Container} from "@evyweb/ioctopus";
import {DependencyProvider} from "@/app/_providers/DependencyProvider";
import {ReactQueryClientProvider} from "@/app/_providers/ReactQueryClientProvider";
import {container, DI_SYMBOLS} from "@/src/client/DependencyInjection";
import {ReactNode} from "react";
import {QueryClient} from "@tanstack/react-query";
import {setupServer} from "msw/node";
import {mockGraphQLQuery} from "@/src/client/specs/utils/mockGraphQLQuery";
import {GET_CHARACTERS} from "@/src/client/infrastructure/queries";

describe('useCharactersList', () => {
    it('should return the initial characters list', async () => {
        // Arrange
        const viewModel: CharactersListViewModel = {
            loadingMessage: 'Loading characters...',
            errorMessage: 'An error occurred while loading characters',
            initialData: {
                characters: [
                    {
                        id: '1',
                        name: 'Luke Skywalker',
                        description: 'Human from Tatooine',
                        loadedFrom: 'Luke Test data',
                    },
                    {
                        id: '2',
                        name: 'Leia Organa',
                        description: 'Human from Alderaan',
                        loadedFrom: 'Leia Test data',
                    },
                    {
                        id: '3',
                        name: 'Han Solo',
                        description: 'Human from Corellia',
                        loadedFrom: 'Han Test data',
                    },
                ]
            }
        };

        const wrapper = createWrapper(container);

        // Act
        const {result} = renderHook(() => useCharactersList(viewModel), {wrapper});

        // Assert
        expect(result.current.characters).toEqual(viewModel.initialData.characters);
    });

    describe('When characters are updated', () => {

        const endpoint = 'http://localhost:3000/api/graphql';

        const server = setupServer();

        beforeAll(() => server.listen());
        afterEach(() => server.resetHandlers());
        afterAll(() => server.close());

        it('should return the updated characters list', async () => {
            // Arrange
            const viewModel: CharactersListViewModel = {
                loadingMessage: 'Loading characters...',
                errorMessage: 'An error occurred while loading characters',
                initialData: {
                    characters: []
                }
            };

            mockGraphQLQuery({
                server,
                endpoint,
                query: GET_CHARACTERS,
                fakeResponse: {
                    characters: [
                        {
                            id: '4',
                            name: 'Darth Vader',
                            species: 'Human',
                            homeworld: 'Tatooine'
                        },
                        {
                            id: '5',
                            name: 'Obi-Wan Kenobi',
                            species: 'Human',
                            homeworld: 'Stewjon'
                        },
                        {
                            id: '6',
                            name: 'Yoda',
                            species: 'Unknown',
                            homeworld: 'Unknown'
                        },
                    ]
                }
            });

            const wrapper = createWrapper(container);
            const {result, rerender} = renderHook(() => useCharactersList(viewModel), {wrapper});

            const client = container.get<QueryClient>(DI_SYMBOLS.QUERY_CLIENT);

            // Act
            await client.invalidateQueries({queryKey: ['characters']});

            rerender();

            // Assert
            expect(result.current.characters).toEqual([
                {
                    id: '4',
                    name: 'Darth Vader',
                    description: 'Human from Tatooine',
                    loadedFrom: 'Data refreshed after the mutation'
                },
                {
                    id: '5',
                    name: 'Obi-Wan Kenobi',
                    description: 'Human from Stewjon',
                    loadedFrom: 'Data refreshed after the mutation'
                },
                {
                    id: '6',
                    name: 'Yoda',
                    description: 'Unknown from Unknown',
                    loadedFrom: 'Data refreshed after the mutation'
                }
            ]);
        });
    });

    function createWrapper(container: Container) {
        function wrapper({children}: { children: ReactNode }) {
            return <DependencyProvider customContainer={container}>
                <ReactQueryClientProvider>
                    {children}
                </ReactQueryClientProvider>
            </DependencyProvider>;
        }

        return wrapper;
    }
});
