import {createContainer, InjectionTokens} from "@evyweb/ioctopus";
import {
    CreateCharacterController
} from "@/src/client/presentation/controllers/CreateCharacter/CreateCharacterController";
import {GetCharactersController} from "@/src/client/presentation/controllers/GetCharacters/GetCharactersController";
import {GraphQLCharacterRepository} from "@/src/client/infrastructure/GraphQLCharacterRepository";
import {GetCharactersUseCase} from "@/src/client/application/usecases/GetCharacters/GetCharactersUseCase";
import {CreateCharacterUseCase} from "@/src/client/application/usecases/CreateCharacter/CreateCharacterUseCase";

export const DI_SYMBOLS: InjectionTokens = {
    CHARACTER_REPOSITORY: Symbol('CHARACTER_REPOSITORY'),
    GET_CHARACTERS_USE_CASE: Symbol('GET_CHARACTERS_USE_CASE'),
    CREATE_CHARACTER_USE_CASE: Symbol('CREATE_CHARACTER_USE_CASE'),
    CREATE_CHARACTER_CONTROLLER: Symbol('CREATE_CHARACTER_CONTROLLER'),
    GET_CHARACTERS_CONTROLLER: Symbol('GET_CHARACTERS_CONTROLLER'),
} as const;

const createTestingContainer = () => {
    const container = createContainer();

    container.bind(DI_SYMBOLS.CHARACTER_REPOSITORY).toHigherOrderFunction(GraphQLCharacterRepository);
    container.bind(DI_SYMBOLS.GET_CHARACTERS_USE_CASE).toHigherOrderFunction(GetCharactersUseCase, [DI_SYMBOLS.CHARACTER_REPOSITORY]);
    container.bind(DI_SYMBOLS.CREATE_CHARACTER_USE_CASE).toHigherOrderFunction(CreateCharacterUseCase, [DI_SYMBOLS.CHARACTER_REPOSITORY]);
    container.bind(DI_SYMBOLS.GET_CHARACTERS_CONTROLLER).toHigherOrderFunction(GetCharactersController, [DI_SYMBOLS.GET_CHARACTERS_USE_CASE]);
    container.bind(DI_SYMBOLS.CREATE_CHARACTER_CONTROLLER).toHigherOrderFunction(CreateCharacterController, [DI_SYMBOLS.CREATE_CHARACTER_USE_CASE]);

    return container;
}

export {createTestingContainer};