'use client';

import {ICreateCharacterUseCase} from "@/src/client/application/ports/driver/ICreateCharacterUseCase";
import {
    IDisplayCreateCharacterStatusUseCase
} from "@/src/client/application/ports/driver/IDisplayCreateCharacterStatusUseCase";
import {ICharacterRepository} from "@/src/client/application/ports/driven/ICharacterRepository";
import {
    useCreateCharacterUseCase
} from "@/src/client/application/usecases/CreateCharacter/useCreateCharacterUseCase";
import {
    useDisplayCreateCharacterStatusUseCase
} from "@/src/client/application/usecases/DisplayCreateCharacterStatus/useDisplayCreateCharacterStatusUseCase";
import {useCharacterRepository} from "@/src/client/infrastructure/repositories/useCharacterRepository";
import {
    ICreateCharacterController,
    useCreateCharacterController
} from "@/src/client/presentation/controllers/useCreateCharacterController";
import {
    IDisplayCreateCharacterStatusController,
    useDisplayCreateCharacterStatusController
} from "@/src/client/presentation/controllers/useDisplayCreateCharacterStatusController";
import {
    ILoadCharactersController,
    useLoadCharactersController
} from "@/src/client/presentation/controllers/useLoadCharactersController";
import {ILoadCharactersUseCase} from "@/src/client/application/ports/driver/ILoadCharactersUseCase";
import {useLoadCharactersUseCase} from "@/src/client/application/usecases/LoadCharacters/useLoadCharactersUseCase";

export type DependencyContainer = {
    createCharacterUseCase: () => ICreateCharacterUseCase;
    displayCreateCharacterStatusUseCase: () => IDisplayCreateCharacterStatusUseCase;
    characterRepository: () => ICharacterRepository;
    createCharacterController: () => ICreateCharacterController;
    displayCreateCharacterStatusController: () => IDisplayCreateCharacterStatusController;
    loadCharactersController: () => ILoadCharactersController;
    loadCharactersUseCase: () => ILoadCharactersUseCase;
}

export const dependencyContainer: DependencyContainer = {
    createCharacterUseCase: useCreateCharacterUseCase,
    displayCreateCharacterStatusUseCase: useDisplayCreateCharacterStatusUseCase,
    characterRepository: useCharacterRepository,
    createCharacterController: useCreateCharacterController,
    displayCreateCharacterStatusController: useDisplayCreateCharacterStatusController,
    loadCharactersController: useLoadCharactersController,
    loadCharactersUseCase: useLoadCharactersUseCase
};
