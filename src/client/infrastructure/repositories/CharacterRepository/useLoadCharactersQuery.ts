import {useSuspenseQuery} from "@apollo/client";
import {GetAllCharactersDTO} from "@/src/client/infrastructure/dtos/GetAllCharactersDTO";
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

export const useLoadCharactersQuery = (): GetAllCharactersDTO => {
    const {data} = useSuspenseQuery<GetAllCharactersDTO>(gql`${GET_CHARACTERS}`);
    return data;
}