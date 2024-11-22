import {useSuspenseQuery} from "@apollo/client";
import {GetCharactersDTO} from "@/src/client/infrastructure/GetCharactersDTO";
import {gql} from "graphql-tag";

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

export const useGetCharactersQuery = (): GetCharactersDTO => {
    const {data} = useSuspenseQuery<GetCharactersDTO>(gql`${GET_CHARACTERS}`);
    return data;
}