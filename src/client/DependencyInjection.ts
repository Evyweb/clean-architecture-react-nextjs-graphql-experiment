'use client';

import {ICharacterRepository} from "@/src/client/application/ports/ICharacterRepository";
import {useCharacterRepository} from "@/src/client/infrastructure/useCharacterRepository";
import {
    ICreateCharacterController,
    useCreateCharacterController
} from "@/src/client/presentation/controllers/useCreateCharacterController";
import {
    IGetCharactersController,
    useGetCharactersController
} from "@/src/client/presentation/controllers/useGetCharactersController";

type Hook<T> = () => T;

export type DependencyContainer = {
    characterRepository: Hook<ICharacterRepository>;
    createCharacterController: Hook<ICreateCharacterController>;
    getCharactersController: Hook<IGetCharactersController>;
}

export const dependencyContainer: DependencyContainer = {
    characterRepository: useCharacterRepository,
    createCharacterController: useCreateCharacterController,
    getCharactersController: useGetCharactersController,
};
