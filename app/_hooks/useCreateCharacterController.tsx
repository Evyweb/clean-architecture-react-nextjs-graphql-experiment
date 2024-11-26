import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useDependency} from "@/app/_hooks/useDependency";
import {CharacterViewModel} from "@/src/client/presentation/viewModels/CharacterViewModel";

interface CharacterToCreateDTO {
    name: string;
    species: string;
    homeworld: string;
}

interface IUseCreateCharacterController {
    createCharacter: (characterToCreate: CharacterToCreateDTO) => void;
}

export const useCreateCharacterController = (): IUseCreateCharacterController => {
    const controller = useDependency('CREATE_CHARACTER_CONTROLLER');
    const queryClient = useQueryClient();

    const mutationResult = useMutation({
        mutationFn: (characterToCreate: CharacterToCreateDTO) => controller.createCharacter(characterToCreate),
        onMutate: async (characterToCreate) => {
            const previousCharacters = queryClient.getQueryData<{ characters: CharacterViewModel[] }>(['characters']);

            queryClient.setQueryData<{ characters: CharacterViewModel[] }>(['characters'], (old) => {
                const oldCharacters = old?.characters || [];
                return {
                    characters: [
                        ...oldCharacters,
                        {
                            id: `temp-${Date.now()}`,
                            name: `[OPTIMISTIC UPDATE] ${characterToCreate.name}`,
                            description: `${characterToCreate.species} from ${characterToCreate.homeworld}`,
                        },
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

    return {
        createCharacter: mutationResult.mutate,
    };
};
