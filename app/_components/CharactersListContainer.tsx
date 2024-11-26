import CharactersList from "@/app/_components/CharactersList";
import {Suspense} from "react";
import {inject} from "@/src/server/DependencyInjection";

const CharactersListContainer = async () => {
    const controller = inject('LOAD_CHARACTERS_CONTROLLER');
    const viewModel = await controller.loadCharacters();

    return (
        <Suspense fallback={<>loading</>}>
            <CharactersList initialData={viewModel}/>
        </Suspense>
    );
};

export default CharactersListContainer;