'use client';

import {ICharacterRepository} from "@/src/client/application/ports/ICharacterRepository";
import {useCharacterRepository} from "@/app/_hooks/useCharacterRepository";
import {
    ICreateCharacterController,
    useCreateCharacterController
} from "@/app/_hooks/useCreateCharacterController";
import {
    IGetCharactersController,
    useGetCharactersController
} from "@/app/_hooks/useGetCharactersController";

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
