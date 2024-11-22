import {useCreateCharacterMutation} from "@/app/_hooks/useCreateCharacterMutation";
import {useGetCharactersQuery} from "@/app/_hooks/useGetCharactersQuery";
import {IGraphQLAdapter} from "@/src/client/infrastructure/IGraphQLAdapter";

export const useGraphQlAdapter = (): IGraphQLAdapter => {
    const {createCharacterMutation} = useCreateCharacterMutation();
    const getCharactersQueryResult = useGetCharactersQuery();

    return {
        createCharacterMutation,
        getCharactersQueryResult
    };
}