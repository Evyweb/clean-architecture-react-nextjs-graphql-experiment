import {createContainer, InjectionTokens} from "@evyweb/ioctopus";
import {InMemoryCharacterRepository} from "@/src/server/infrastructure/repositories/InMemoryCharacterRepository";
import {CharactersController} from "@/src/server/presentation/controllers/CharactersController";
import {LoadCharactersUseCase} from "@/src/server/application/usecases/LoadCharactersUseCase/LoadCharactersUseCase";
import {UuidIdentityProvider} from "@/src/server/infrastructure/providers/UuidIdentityProvider";
import {CreateCharacterUseCase} from "@/src/server/application/usecases/CreateCharacterUseCase/CreateCharacterUseCase";
import {CharacterRepository} from "@/src/server/application/ports/driven/CharacterRepository";
import {IGetCharactersUseCase} from "@/src/server/application/ports/driver/IGetCharactersUseCase";
import {IdentityProvider} from "@/src/server/application/ports/driven/IdentityProvider";
import {ICreateCharacterUseCase} from "@/src/server/application/ports/driver/ICreateCharacterUseCase";

const DI_SYMBOLS: InjectionTokens = {
    CHARACTER_REPOSITORY: Symbol('CHARACTER_REPOSITORY'),
    LOAD_CHARACTERS_USE_CASE: Symbol('LOAD_CHARACTERS_USE_CASE'),
    IDENTITY_PROVIDER: Symbol('IDENTITY_PROVIDER'),
    CREATE_CHARACTER_USE_CASE: Symbol('CREATE_CHARACTER_USE_CASE'),
    CHARACTERS_CONTROLLER: Symbol('CHARACTERS_CONTROLLER'),
}

type DI_RETURN_TYPES = {
    CHARACTER_REPOSITORY: CharacterRepository,
    LOAD_CHARACTERS_USE_CASE: IGetCharactersUseCase,
    IDENTITY_PROVIDER: IdentityProvider,
    CREATE_CHARACTER_USE_CASE: ICreateCharacterUseCase,
    CHARACTERS_CONTROLLER: CharactersController,
}

const container = createContainer();
container.bind(DI_SYMBOLS.CHARACTER_REPOSITORY).toClass(InMemoryCharacterRepository);
container.bind(DI_SYMBOLS.LOAD_CHARACTERS_USE_CASE).toClass(LoadCharactersUseCase, [DI_SYMBOLS.CHARACTER_REPOSITORY]);
container.bind(DI_SYMBOLS.IDENTITY_PROVIDER).toClass(UuidIdentityProvider);
container.bind(DI_SYMBOLS.CREATE_CHARACTER_USE_CASE).toClass(CreateCharacterUseCase, [DI_SYMBOLS.CHARACTER_REPOSITORY, DI_SYMBOLS.IDENTITY_PROVIDER]);
container.bind(DI_SYMBOLS.CHARACTERS_CONTROLLER).toClass(CharactersController, [DI_SYMBOLS.LOAD_CHARACTERS_USE_CASE, DI_SYMBOLS.CREATE_CHARACTER_USE_CASE]);

export function inject<K extends keyof typeof DI_SYMBOLS>(
    symbol: K
): K extends keyof DI_RETURN_TYPES ? DI_RETURN_TYPES[K] : never {
    return container.get(DI_SYMBOLS[symbol]);
}