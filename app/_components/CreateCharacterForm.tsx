'use client';

import React, {FormEvent, useState} from 'react';
import {useCreateCharacterController} from "@/app/_hooks/useCreateCharacterController";
import {Button, Flex, Text} from '@radix-ui/themes';

const CreateCharacterForm: React.FC = () => {
    const {createCharacter} = useCreateCharacterController();

    const [name, setName] = useState('');
    const [species, setSpecies] = useState('');
    const [homeworld, setHomeworld] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        setIsLoading(true);
        e.preventDefault();
        createCharacter({name, species, homeworld});
        setName('');
        setSpecies('');
        setHomeworld('');
        setIsLoading(false);
    };

    return (
        <form onSubmit={handleSubmit}>
            <Flex direction="row" gap="3">
                <input
                    className="Input"
                    id="name"
                    placeholder="Enter character name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    autoComplete="off"
                />
                <input
                    className="Input"
                    id="species"
                    placeholder="Enter character species"
                    value={species}
                    onChange={(e) => setSpecies(e.target.value)}
                    required
                    autoComplete="off"
                />
                <input
                    className="Input"
                    id="homeworld"
                    placeholder="Enter character homeworld"
                    value={homeworld}
                    onChange={(e) => setHomeworld(e.target.value)}
                    required
                    autoComplete="off"
                />
                <Button type="submit" size="3" className="hover:cursor-pointer" loading={isLoading}>
                    <Text size="3" weight="bold">+ Add character</Text>
                </Button>
            </Flex>
        </form>
    );
};

export default CreateCharacterForm;

