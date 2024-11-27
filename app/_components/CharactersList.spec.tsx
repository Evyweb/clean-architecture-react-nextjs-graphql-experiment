import {render} from "@testing-library/react";
import CharactersList from "@/app/_components/CharactersList";
import {DependencyProvider} from "@/app/_providers/DependencyProvider";
import {ReactQueryClientProvider} from "@/app/_providers/ReactQueryClientProvider";
import {GetCharactersViewModel} from "@/src/client/presentation/viewModels/GetCharactersViewModel";
import {Container, createContainer} from "@evyweb/ioctopus";
import {GetCharactersUseCase} from "@/src/client/application/usecases/GetCharacters/GetCharactersUseCase";
import {GetCharactersController} from "@/src/client/presentation/controllers/GetCharacters/GetCharactersController";
import {DI_SYMBOLS} from "@/src/client/DependencyInjection";
import {InMemoryCharacterRepository} from "@/src/client/specs/utils/fakes/InMemoryCharacterRepository";

describe('CharactersList', () => {
    let container: Container;

    beforeEach(() => {
        container = createContainer();
        container.bind(DI_SYMBOLS.CHARACTER_REPOSITORY).toHigherOrderFunction(InMemoryCharacterRepository, []);
        container.bind(DI_SYMBOLS.GET_CHARACTERS_USE_CASE).toHigherOrderFunction(GetCharactersUseCase, [DI_SYMBOLS.CHARACTER_REPOSITORY]);
        container.bind(DI_SYMBOLS.GET_CHARACTERS_CONTROLLER).toHigherOrderFunction(GetCharactersController, [DI_SYMBOLS.GET_CHARACTERS_USE_CASE]);
    });

    describe('When the characters list is displayed', () => {
        it('should have all initially given characters', async () => {
            // Arrange
            const initialCharacters = {
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
            };

            // Act
            const {findByText} = renderCharacterList(initialCharacters, container);

            // Assert
            expect(await findByText('Luke Skywalker')).toBeInTheDocument();
            expect(await findByText('Human from Tatooine')).toBeInTheDocument();
            expect(await findByText('Luke Test data')).toBeInTheDocument();

            expect(await findByText('Leia Organa')).toBeInTheDocument();
            expect(await findByText('Human from Alderaan')).toBeInTheDocument();
            expect(await findByText('Leia Test data')).toBeInTheDocument();

            expect(await findByText('Han Solo')).toBeInTheDocument();
            expect(await findByText('Human from Corellia')).toBeInTheDocument();
            expect(await findByText('Han Test data')).toBeInTheDocument();
        });
    });

    function renderCharacterList(initialCharacters: GetCharactersViewModel, container: Container) {
        return render(
            <DependencyProvider customContainer={container}>
                <ReactQueryClientProvider>
                    <CharactersList initialData={initialCharacters}/>
                </ReactQueryClientProvider>
            </DependencyProvider>
        );
    }
});