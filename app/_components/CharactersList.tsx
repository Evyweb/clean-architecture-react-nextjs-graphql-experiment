'use client';

import {useAutoAnimate} from '@formkit/auto-animate/react';
import {useDependency} from "@/app/_hooks/useDependency";

const CharactersList = () => {
    const getCharactersController = useDependency('getCharactersController');
    const viewModel = getCharactersController.getCharacters();

    const [animationParent] = useAutoAnimate();

    return (
        <ul className="space-y-2" ref={animationParent}>
            {viewModel.characters.map((character) => (
                <li key={character.id} className="p-4 bg-white rounded shadow flex items-center justify-between">
                    <strong className="block text-lg font-semibold">{character.name}</strong>
                    <span className="block text-gray-700">{character.description}</span>
                </li>
            ))}
        </ul>
    );
};

export default CharactersList;