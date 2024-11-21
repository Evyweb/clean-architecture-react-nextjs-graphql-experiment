import {useSuspenseQuery} from "@apollo/client";
import {GetAllCharactersDTO} from "@/src/client/infrastructure/dtos/GetAllCharactersDTO";
import {gql} from "graphql-tag";
import {GET_CHARACTERS} from "@/src/shared/graphQL/queries";

export const useLoadCharactersQuery = (): GetAllCharactersDTO => {
    const {data} = useSuspenseQuery<GetAllCharactersDTO>(gql`${GET_CHARACTERS}`);
    return data;
}