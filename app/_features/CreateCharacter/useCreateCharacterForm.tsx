import {FormEvent, useState} from "react";
import {CreateCharacterFormViewModel} from "@/src/client/presentation/viewModels/CreateCharacterFormViewModel";
import {useDependency} from "@/app/_hooks/useDependency";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {CharacterViewModel} from "@/src/client/presentation/viewModels/CharacterViewModel";
import {CharacterToCreateDTO} from "@/src/client/application/ports/ICharacterRepository";

export const useCreateCharacterForm = (viewModel: CreateCharacterFormViewModel) => {
    const controller = useDependency('CREATE_CHARACTER_CONTROLLER');
    const queryClient = useQueryClient();

    const {mutate: createCharacter} = useMutation({
        mutationFn: (characterToCreate: CharacterToCreateDTO) => controller.createCharacter(characterToCreate),
        onMutate: async (characterToCreate) => {
            const previousCharacters = queryClient.getQueryData<{ characters: CharacterViewModel[] }>(['characters']);

            queryClient.setQueryData<{ characters: CharacterViewModel[] }>(['characters'], (old) => {
                const oldCharacters = old?.characters || [];
                return {
                    characters: [
                        {
                            id: `temp-${Date.now()}`,
                            name: characterToCreate.name,
                            description: `${characterToCreate.species} from ${characterToCreate.homeworld}`,
                            loadedFrom: 'Temporary data used for optimistic UI',
                        },
                        ...oldCharacters,
                    ],
                };
            });

            return {previousCharacters};
        },
        onError: (_err, _newCharacter, context) => {
            if (context?.previousCharacters) {
                queryClient.setQueryData(['characters'], context.previousCharacters);
            }
        },
        onSettled: async () => {
            await queryClient.invalidateQueries({queryKey: ['characters']});
        },
    });

    const [name, setName] = useState(viewModel.name.initialValue);
    const [species, setSpecies] = useState(viewModel.species.initialValue);
    const [homeworld, setHomeworld] = useState(viewModel.homeworld.initialValue);
    const [isLoading, setIsLoading] = useState(viewModel.isLoading.initialValue);

    const handleSubmit = async (e: FormEvent) => {
        setIsLoading(true);
        e.preventDefault();
        createCharacter({name, species, homeworld});
        setName('');
        setSpecies('');
        setHomeworld('');
        setIsLoading(false);
    };

    return {
        name,
        species,
        homeworld,
        isLoading,
        setName,
        setSpecies,
        setHomeworld,
        handleSubmit
    };
}