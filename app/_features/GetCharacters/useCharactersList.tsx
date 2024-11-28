import {useAutoAnimate} from "@formkit/auto-animate/react";
import {CharactersListViewModel} from "@/src/client/presentation/viewModels/CharactersListViewModel";
import {useDependency} from "@/app/_hooks/useDependency";
import {useQuery} from "@tanstack/react-query";

export const useCharactersList = (viewModel: CharactersListViewModel) => {
    const controller = useDependency('GET_CHARACTERS_CONTROLLER');

    const {isLoading, isError, data} = useQuery({
        queryKey: ['characters'],
        queryFn: () => controller.getCharacters(),
        initialData: viewModel.initialData
    });

    const [animationParent] = useAutoAnimate();

    return {
        characters: data?.characters || [],
        isLoading,
        isError,
        animationParent
    };
}