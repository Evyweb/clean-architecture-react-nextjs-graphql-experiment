'use client';

import {FormEvent, useState} from 'react';
import {useDependency} from "@/app/_DependencyInjection/useDependency";

const CreateCharacterForm = () => {
    const repository = useDependency('useCharacterRepository');
    const createCharacterController = useDependency('useCreateCharacterController', repository);

    const [name, setName] = useState('');
    const [species, setSpecies] = useState('');
    const [homeworld, setHomeworld] = useState('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        await createCharacterController.createCharacter({name, species, homeworld});
        setName('');
        setSpecies('');
        setHomeworld('');
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded"
            />
            <input
                type="text"
                placeholder="Species"
                value={species}
                onChange={(e) => setSpecies(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded"
            />
            <input
                type="text"
                placeholder="Homeworld"
                value={homeworld}
                onChange={(e) => setHomeworld(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded"
            />
            <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">Add
                character
            </button>
        </form>
    );
};

export default CreateCharacterForm;