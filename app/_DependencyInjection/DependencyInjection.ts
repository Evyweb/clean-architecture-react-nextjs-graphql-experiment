'use client';
import {useGraphQLCharacterRepository} from "@/app/_DependencyInjection/useGraphQLCharacterRepository";
import {
    ICreateCharacterController,
    useCreateCharacterController
} from "@/app/_DependencyInjection/useCreateCharacterController";
import {
    IGetCharactersController,
    useGetCharactersController
} from "@/app/_DependencyInjection/useGetCharactersController";
import {ICharacterRepository} from "@/src/client/application/ports/ICharacterRepository";

export type DependencyContainer = {
    useCharacterRepository: () => ICharacterRepository;
    useCreateCharacterController: (repository: ICharacterRepository) => ICreateCharacterController;
    useGetCharactersController: (repository: ICharacterRepository) => IGetCharactersController;
}

export const dependencyContainer: DependencyContainer = {
    useCharacterRepository: useGraphQLCharacterRepository,
    useCreateCharacterController: useCreateCharacterController,
    useGetCharactersController: useGetCharactersController,
};