import {ICharacterRepository} from "@/src/client/application/ports/ICharacterRepository";
import {GraphQLCharacterRepository} from "@/src/client/infrastructure/GraphQLCharacterRepository";
import {useGraphQlAdapter} from "@/app/_hooks/useGraphQlAdapter";

export const useCharacterRepository = (): ICharacterRepository => {
    const graphQLAdapter = useGraphQlAdapter();
    return GraphQLCharacterRepository(graphQLAdapter);
}