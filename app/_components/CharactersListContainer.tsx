import {Suspense} from "react";
import {PreloadQuery} from "@/app/_config/RSCApolloClient";
import CharactersList from "@/app/_components/CharactersList";

import {gql} from "graphql-tag";

const CharactersListContainer = async () => {
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

    return (
        <PreloadQuery query={gql`${GET_CHARACTERS}`}>
            <Suspense fallback={<>loading</>}>
                <CharactersList/>
            </Suspense>
        </PreloadQuery>
    );
};

export default CharactersListContainer;