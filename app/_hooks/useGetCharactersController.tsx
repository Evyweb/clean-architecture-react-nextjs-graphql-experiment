import {useQuery} from '@tanstack/react-query';
import {GetCharactersViewModel} from "@/src/client/presentation/viewModels/GetCharactersViewModel";
import {useDependency} from "@/app/_hooks/useDependency";

interface IUseGetCharactersController {
    isLoading: boolean;
    isError: boolean;
    data: GetCharactersViewModel | undefined,
}

export const useGetCharactersController = (initialData?: GetCharactersViewModel): IUseGetCharactersController => {
    const controller = useDependency('GET_CHARACTERS_CONTROLLER');

    const queryResult = useQuery({
        queryKey: ['characters'],
        queryFn: () => controller.getCharacters(),
        initialData
    });

    return {
        data: queryResult.data,
        isLoading: queryResult.isLoading,
        isError: queryResult.isError,
    }
};