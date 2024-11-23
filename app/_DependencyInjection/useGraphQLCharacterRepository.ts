import {GetCharactersDTO, GraphQLCharacterRepository} from "@/src/client/infrastructure/GraphQLCharacterRepository";
import {useMutation, useSuspenseQuery} from "@apollo/client";
import {gql} from "graphql-tag";

let tempIdCounter = 0;

const GET_CHARACTERS = `
    query {
        characters {
            id
            name
            species
            homeworld
        }
    }
`;

export const useGraphQLCharacterRepository = () => {
    const [createCharacterMutation] = useMutation(
        gql`
            mutation CreateCharacter($name: String!, $species: String!, $homeworld: String!) {
                createCharacter(name: $name, species: $species, homeworld: $homeworld) {
                    id
                    name
                    species
                    homeworld
                }
            }
        `,
        {
            optimisticResponse: () => ({
                createCharacter: {
                    __typename: 'Character',
                    id: `temp-id-${tempIdCounter++}`,
                    name: '...',
                    species: '...',
                    homeworld: '...',
                },
            }),
            update: (cache, {data: {createCharacter}}) => {
                cache.modify({
                    fields: {
                        characters(existingCharacters = []) {
                            const newCharacterRef = cache.writeFragment({
                                data: createCharacter,
                                fragment: gql`
                                    fragment NewCharacter on Character {
                                        id
                                        name
                                        species
                                        homeworld
                                    }
                                `,
                            });
                            return [...existingCharacters, newCharacterRef];
                        },
                    },
                });
            },
        }
    );

    const {data} = useSuspenseQuery<GetCharactersDTO>(gql`${GET_CHARACTERS}`);

    return GraphQLCharacterRepository(
        createCharacterMutation,
        data
    );
}