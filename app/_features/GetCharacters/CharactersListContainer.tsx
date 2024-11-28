import CharactersList from "@/app/_features/GetCharacters/CharactersList";
import {inject} from "@/src/server/DependencyInjection";

const CharactersListContainer = async () => {
    const controller = inject('LOAD_CHARACTERS_CONTROLLER');
    const viewModel = await controller.loadCharacters();

    return (
        <CharactersList viewModel={viewModel}/>
    );
};

export default CharactersListContainer;