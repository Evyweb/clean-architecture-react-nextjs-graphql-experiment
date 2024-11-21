'use client';

import {ICreateCharacterUseCase} from "@/src/client/application/ports/ICreateCharacterUseCase";
import {ICharacterRepository} from "@/src/client/application/ports/ICharacterRepository";
import {useCreateCharacterUseCase} from "@/src/client/application/usecases/useCreateCharacterUseCase";
import {useCharacterRepository} from "@/src/client/infrastructure/useCharacterRepository";
import {
    ICreateCharacterController,
    useCreateCharacterController
} from "@/src/client/presentation/controllers/useCreateCharacterController";
import {
    IGetCharactersController,
    useGetCharactersController
} from "@/src/client/presentation/controllers/useGetCharactersController";
import {IGetCharactersUseCase} from "@/src/client/application/ports/IGetCharactersUseCase";
import {useGetCharactersUseCase} from "@/src/client/application/usecases/useGetCharactersUseCase";

type Hook<T> = () => T;

export type DependencyContainer = {
    createCharacterUseCase: Hook<ICreateCharacterUseCase>;
    characterRepository: Hook<ICharacterRepository>;
    createCharacterController: Hook<ICreateCharacterController>;
    getCharactersController: Hook<IGetCharactersController>;
    getCharactersUseCase: Hook<IGetCharactersUseCase>;
}

export const dependencyContainer: DependencyContainer = {
    createCharacterUseCase: useCreateCharacterUseCase,
    characterRepository: useCharacterRepository,
    createCharacterController: useCreateCharacterController,
    getCharactersController: useGetCharactersController,
    getCharactersUseCase: useGetCharactersUseCase
};
