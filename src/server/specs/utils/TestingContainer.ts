import {createContainer} from "@evyweb/ioctopus";
import {Character} from "@/src/server/domain/Character";
import {CreateCharacterController} from "@/src/server/presentation/controllers/CreateCharacterController";
import {GetCharactersController} from "@/src/server/presentation/controllers/GetCharactersController";
import {LoadCharactersController} from "@/src/server/presentation/controllers/LoadCharactersController";
import {GraphQLCharacterController} from "@/src/server/presentation/controllers/GraphQLCharacterController";
import {InMemoryCharacterRepository} from "@/src/server/infrastructure/InMemoryCharacterRepository";
import {GetCharactersUseCase} from "@/src/server/application/usecases/GetCharacters/GetCharactersUseCase";
import {CreateCharacterUseCase} from "@/src/server/application/usecases/CreateCharacter/CreateCharacterUseCase";
import {DI_SYMBOLS} from "@/src/server/DependencyInjection";
import {FakeIdentityProvider} from "@/src/server/specs/fakes/FakeIdentityProvider";

const createTestingContainer = () => {

    const container = createContainer();

    const existingCharacters: Character[] = [];
    container.bind(DI_SYMBOLS.EXISTING_CHARACTERS).toValue(existingCharacters);
    container.bind(DI_SYMBOLS.CHARACTER_REPOSITORY).toHigherOrderFunction(InMemoryCharacterRepository, [
        DI_SYMBOLS.EXISTING_CHARACTERS
    ]);
    container.bind(DI_SYMBOLS.GET_CHARACTERS_USE_CASE).toHigherOrderFunction(GetCharactersUseCase, {
        characterRepository: DI_SYMBOLS.CHARACTER_REPOSITORY
    });
    container.bind(DI_SYMBOLS.IDENTITY_PROVIDER).toHigherOrderFunction(FakeIdentityProvider);
    container.bind(DI_SYMBOLS.CREATE_CHARACTER_USE_CASE).toHigherOrderFunction(CreateCharacterUseCase, {
        characterRepository: DI_SYMBOLS.CHARACTER_REPOSITORY,
        identityProvider: DI_SYMBOLS.IDENTITY_PROVIDER
    });
    container.bind(DI_SYMBOLS.CREATE_CHARACTER_CONTROLLER).toHigherOrderFunction(CreateCharacterController, {
        createCharacterUseCase: DI_SYMBOLS.CREATE_CHARACTER_USE_CASE
    });
    container.bind(DI_SYMBOLS.GET_CHARACTERS_CONTROLLER).toHigherOrderFunction(GetCharactersController, {
        getCharactersUseCase: DI_SYMBOLS.GET_CHARACTERS_USE_CASE
    });
    container.bind(DI_SYMBOLS.LOAD_CHARACTERS_CONTROLLER).toHigherOrderFunction(LoadCharactersController, {
        getCharactersUseCase: DI_SYMBOLS.GET_CHARACTERS_USE_CASE
    });
    container.bind(DI_SYMBOLS.GRAPHQL_CHARACTER_CONTROLLER).toHigherOrderFunction(GraphQLCharacterController, {
        createCharacterController: DI_SYMBOLS.CREATE_CHARACTER_CONTROLLER,
        getCharactersController: DI_SYMBOLS.GET_CHARACTERS_CONTROLLER
    });

    return container;
};

export {createTestingContainer};