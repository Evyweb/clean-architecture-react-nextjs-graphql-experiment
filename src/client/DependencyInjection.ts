'use client';

import {useCharacterRepository} from "@/app/_hooks/useCharacterRepository";

export type DependencyContainer = {
    characterRepository: typeof useCharacterRepository;
}

export const dependencyContainer: DependencyContainer = {
    characterRepository: useCharacterRepository,
};
