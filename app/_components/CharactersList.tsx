'use client';

import {CharacterViewModel} from "@/src/server/presentation/viewModels/CharacterViewModel";
import {useAutoAnimate} from '@formkit/auto-animate/react';
import {useDependency} from "@/src/client/presentation/hooks/useDependency";

const CharactersList = () => {
    const loadCharactersController = useDependency('loadCharactersController');
    const viewModel = loadCharactersController.loadCharacters();

    const [animationParent] = useAutoAnimate();

    return (
        <ul className="space-y-2" ref={animationParent}>
            {viewModel.characters.map((character: CharacterViewModel) => (
                <li key={character.id} className="p-4 bg-white rounded shadow flex items-center justify-between">
                    <strong className="block text-lg font-semibold">{character.name}</strong>
                    <span className="block text-gray-700">{character.description}</span>
                </li>
            ))}
        </ul>
    );
};

export default CharactersList;