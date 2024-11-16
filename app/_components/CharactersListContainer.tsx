import {Suspense} from "react";
import {PreloadQuery} from "@/src/client/presentation/providers/RSCApolloClient";
import CharactersList from "@/app/_components/CharactersList";
import {GET_CHARACTERS} from "@/src/shared/graphQL/queries";
import {gql} from "graphql-tag";

const CharactersListContainer = async () => {
    return (
        <PreloadQuery query={gql`${GET_CHARACTERS}`}>
            <Suspense fallback={<>loading</>}>
                <CharactersList/>
            </Suspense>
        </PreloadQuery>
    );
};

export default CharactersListContainer;