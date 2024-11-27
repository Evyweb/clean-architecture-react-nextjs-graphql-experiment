import {revalidatePath} from "next/cache";
import {GET, POST} from "@/app/api/graphql/route";
import {CREATE_CHARACTER, GET_CHARACTERS} from "@/src/client/infrastructure/queries";
import {vi} from "vitest";
import {container, DI_SYMBOLS} from "@/src/server/DependencyInjection";
import {ICharacterRepository} from "@/src/server/application/ports/ICharacterRepository";

vi.mock('next/cache');

describe('api/graphql/route', () => {
    let repository: ICharacterRepository;

    beforeEach(() => {
        vi.clearAllMocks();
        repository = container.get<ICharacterRepository>(DI_SYMBOLS.CHARACTER_REPOSITORY);
        repository.clear();
    });

    describe('Success', () => {
        describe('POST', () => {
            let request: Request;

            beforeEach(() => {
                request = {
                    json: () => Promise.resolve({
                        query: CREATE_CHARACTER,
                        variables: {name: 'Yoda', species: 'Yoda', homeworld: 'Dagobah'}
                    }),
                } as Request;
            });

            it('should revalidate the path', async () => {
                // Act
                await POST(request);

                // Assert
                expect(revalidatePath).toBeCalled();
            });

            it('should return json content', async () => {
                // Act
                const response = await POST(request);

                // Assert
                expect(response.headers.get('Content-Type')).toEqual('application/json');
            });

            it('should return 200 HTTP Status', async () => {
                // Act
                const response = await POST(request);

                // Assert
                expect(response.ok).toBe(true);
            });

            it('should add a new character', async () => {
                // Act
                await POST(request);

                // Assert
                const repository = container.get<ICharacterRepository>(DI_SYMBOLS.CHARACTER_REPOSITORY);
                const characters = await repository.getAll();
                expect(characters).toEqual([{
                    id: expect.any(String),
                    name: "Yoda",
                    species: "Yoda",
                    homeworld: "Dagobah"
                }]);
            });
        });

        describe('GET', () => {
            let request: Request;

            beforeEach(() => {
                request = {
                    json: () => Promise.resolve({query: GET_CHARACTERS, variables: undefined}),
                } as Request;
            });

            it('should not revalidate the path', async () => {
                // Act
                await GET(request);

                // Assert
                expect(revalidatePath).not.toBeCalled();
            });

            it('should return json content', async () => {
                // Act
                const response = await GET(request);

                // Assert
                expect(response.headers.get('Content-Type')).toEqual('application/json');
            });

            it('should return 200 HTTP Status', async () => {
                // Act
                const response = await GET(request);

                // Assert
                expect(response.ok).toBe(true);
            });

            it('should return existing characters', async () => {
                await repository.add({id: '1', name: 'Luke Skywalker', species: 'Human', homeworld: 'Tatooine'});
                await repository.add({id: '2', name: 'Darth Vader', species: 'Human', homeworld: 'Tatooine'});
                await repository.add({id: '3', name: 'Yoda', species: 'Yoda', homeworld: 'Dagobah'});

                // Act
                const response = await GET(request);

                // Assert
                const json = await response.json();
                expect(json).toEqual({
                    data: {
                        characters: [{
                            id: "3",
                            name: "Yoda",
                            species: "Yoda",
                            homeworld: "Dagobah"
                        }, {
                            id: "2",
                            name: "Darth Vader",
                            species: "Human",
                            homeworld: "Tatooine"
                        }, {
                            id: "1",
                            name: "Luke Skywalker",
                            species: "Human",
                            homeworld: "Tatooine"
                        }]
                    }
                });
            });
        });
    });

    describe('Failure', () => {
        describe('GET', () => {
            it('should return 400 HTTP Status', async () => {
                // Arrange
                const request: Request = {
                    json: () => Promise.resolve({query: 'INVALID', variables: undefined}),
                } as Request;

                // Act
                const response = await GET(request);

                // Assert
                expect(response.ok).toBe(false);
                expect(response.status).toEqual(400);
            });
        });

        describe('POST', () => {
            it('should return 400 HTTP Status', async () => {
                // Arrange
                const request: Request = {
                    json: () => Promise.resolve({query: 'INVALID', variables: undefined}),
                } as Request;

                // Act
                const response = await POST(request);

                // Assert
                expect(response.ok).toBe(false);
                expect(response.status).toEqual(400);
            });
        });
    });
});