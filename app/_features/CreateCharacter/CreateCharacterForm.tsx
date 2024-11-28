'use client';

import React from 'react';
import {Button, Flex, Text} from '@radix-ui/themes';
import {useCreateCharacterForm} from "@/app/_features/CreateCharacter/useCreateCharacterForm";
import {CreateCharacterFormViewModel} from "@/src/client/presentation/viewModels/CreateCharacterFormViewModel";

interface CreateCharacterFormProps {
    viewModel: CreateCharacterFormViewModel;
}

const CreateCharacterForm: React.FC<CreateCharacterFormProps> = ({viewModel}: CreateCharacterFormProps) => {
    const {
        name,
        species,
        homeworld,
        isLoading,
        setName,
        setSpecies,
        setHomeworld,
        handleSubmit
    } = useCreateCharacterForm(viewModel);

    return (
        <form onSubmit={handleSubmit}>
            <Flex direction="row" gap="3">
                <input
                    className="Input"
                    id="name"
                    placeholder={viewModel.name.placeholder}
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

