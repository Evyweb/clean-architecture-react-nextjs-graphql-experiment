import {GraphQLCharacterRepository} from "@/src/client/infrastructure/GraphQLCharacterRepository";
import {useGraphQlAdapter} from "@/app/_hooks/graphQL/useGraphQlAdapter";

export const useCharacterRepository = () => {
    const graphQLAdapter = useGraphQlAdapter();
    return GraphQLCharacterRepository(graphQLAdapter);
}