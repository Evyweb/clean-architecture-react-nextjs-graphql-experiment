import {CharacterToCreateDTO, ICharacterRepository} from "@/src/client/application/ports/ICharacterRepository";
import {Character} from "@/src/client/domain/Character";
import {IGraphQLAdapter} from "@/src/client/infrastructure/IGraphQLAdapter";

export const GraphQLCharacterRepository = (
    graphQlAdapter: IGraphQLAdapter,
): ICharacterRepository => {
    return {
        createCharacter: async (characterToCreate: CharacterToCreateDTO) => {
            await graphQlAdapter.createCharacterMutation({
                variables: characterToCreate,
            })
        },
        getAll: (): Character[] => {
            return graphQlAdapter.getCharactersQueryResult.characters.map((character) => ({
                id: character.id,
                name: character.name,
                homeworld: character.homeworld,
                species: character.species
            }));
        }
    }
}