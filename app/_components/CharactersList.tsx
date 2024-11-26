'use client';

import {useAutoAnimate} from '@formkit/auto-animate/react';
import {useGetCharactersController} from "@/app/_hooks/useGetCharactersController";
import {GetCharactersViewModel} from "@/src/client/presentation/viewModels/GetCharactersViewModel";

interface CharactersListProps {
    initialData: GetCharactersViewModel
}

const CharactersList = ({initialData}: CharactersListProps) => {
    const {data, isLoading, isError} = useGetCharactersController(initialData);
    const [animationParent] = useAutoAnimate();

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error fetching characters</p>;

    return (
        <ul className="space-y-2" ref={animationParent}>
            {data?.characters.map((character: {
                id: string;
                name: string;
                description: string;
            }) => (
                <li key={character.id} className="p-4 bg-white rounded shadow flex items-center justify-between">
                    <strong className="block text-lg font-semibold">{character.name}</strong>
                    <span className="block text-gray-700">{character.description}</span>
                </li>
            ))}
        </ul>
    );
};

export default CharactersList;