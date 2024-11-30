import {createContainer, InjectionTokens} from "@evyweb/ioctopus";
import {GraphQLCharacterRepository} from "@/src/client/infrastructure/GraphQLCharacterRepository";
import {GetCharactersUseCase} from "@/src/client/application/usecases/GetCharacters/GetCharactersUseCase";
import {CreateCharacterUseCase} from "@/src/client/application/usecases/CreateCharacter/CreateCharacterUseCase";
import {
    GetCharactersController,
    IGetCharactersController
} from "@/src/client/presentation/controllers/GetCharacters/GetCharactersController";
import {
    CreateCharacterController,
    ICreateCharacterController
} from "@/src/client/presentation/controllers/CreateCharacter/CreateCharacterController";
import {ICharacterRepository} from "@/src/client/application/ports/ICharacterRepository";
import {IGetCharactersUseCase} from "@/src/client/application/ports/IGetCharactersUseCase";
import {ICreateCharacterUseCase} from "@/src/client/application/ports/ICreateCharacterUseCase";
import {QueryClient} from "@tanstack/react-query";

export const DI_SYMBOLS: InjectionTokens = {
    QUERY_CLIENT: Symbol('QUERY_CLIENT'),
    CHARACTER_REPOSITORY: Symbol('CHARACTER_REPOSITORY'),
    GET_CHARACTERS_USE_CASE: Symbol('GET_CHARACTERS_USE_CASE'),
    CREATE_CHARACTER_USE_CASE: Symbol('CREATE_CHARACTER_USE_CASE'),
    CREATE_CHARACTER_CONTROLLER: Symbol('CREATE_CHARACTER_CONTROLLER'),
    GET_CHARACTERS_CONTROLLER: Symbol('GET_CHARACTERS_CONTROLLER'),
} as const;

export type DI_RETURN_TYPES = {
    QUERY_CLIENT: QueryClient,
    CHARACTER_REPOSITORY: ICharacterRepository,
    GET_CHARACTERS_USE_CASE: IGetCharactersUseCase,
    CREATE_CHARACTER_USE_CASE: ICreateCharacterUseCase,
    CREATE_CHARACTER_CONTROLLER: ICreateCharacterController,
    GET_CHARACTERS_CONTROLLER: IGetCharactersController,
}

const container = createContainer();

container.bind(DI_SYMBOLS.QUERY_CLIENT).toValue(new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 60 * 1000,
        },
    },
}));

container.bind(DI_SYMBOLS.CHARACTER_REPOSITORY).toHigherOrderFunction(GraphQLCharacterRepository, []);
container.bind(DI_SYMBOLS.GET_CHARACTERS_USE_CASE).toHigherOrderFunction(GetCharactersUseCase, [DI_SYMBOLS.CHARACTER_REPOSITORY]);
container.bind(DI_SYMBOLS.CREATE_CHARACTER_USE_CASE).toHigherOrderFunction(CreateCharacterUseCase, [DI_SYMBOLS.CHARACTER_REPOSITORY]);
container.bind(DI_SYMBOLS.GET_CHARACTERS_CONTROLLER).toHigherOrderFunction(GetCharactersController, [DI_SYMBOLS.GET_CHARACTERS_USE_CASE]);
container.bind(DI_SYMBOLS.CREATE_CHARACTER_CONTROLLER).toHigherOrderFunction(CreateCharacterController, [DI_SYMBOLS.CREATE_CHARACTER_USE_CASE]);

export {container};