'use client';

import {ICreateCharacterUseCase} from "@/src/client/application/ports/driver/ICreateCharacterUseCase";
import {ICharacterRepository} from "@/src/client/application/ports/driven/ICharacterRepository";
import {useCreateCharacterUseCase} from "@/src/client/application/usecases/CreateCharacter/useCreateCharacterUseCase";
import {useCharacterRepository} from "@/src/client/infrastructure/repositories/useCharacterRepository";
import {
    ICreateCharacterController,
    useCreateCharacterController
} from "@/src/client/presentation/controllers/useCreateCharacterController";
import {
    ILoadCharactersController,
    useLoadCharactersController
} from "@/src/client/presentation/controllers/useLoadCharactersController";
import {ILoadCharactersUseCase} from "@/src/client/application/ports/driver/ILoadCharactersUseCase";
import {useLoadCharactersUseCase} from "@/src/client/application/usecases/LoadCharacters/useLoadCharactersUseCase";

export type DependencyContainer = {
    createCharacterUseCase: () => ICreateCharacterUseCase;
    characterRepository: () => ICharacterRepository;
    createCharacterController: () => ICreateCharacterController;
    loadCharactersController: () => ILoadCharactersController;
    loadCharactersUseCase: () => ILoadCharactersUseCase;
}

export const dependencyContainer: DependencyContainer = {
    createCharacterUseCase: useCreateCharacterUseCase,
    characterRepository: useCharacterRepository,
    createCharacterController: useCreateCharacterController,
    loadCharactersController: useLoadCharactersController,
    loadCharactersUseCase: useLoadCharactersUseCase
};
