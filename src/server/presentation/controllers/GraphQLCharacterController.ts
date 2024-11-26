import {CreateCharacterRequest} from "@/src/server/presentation/requests/CreateCharacterRequest";
import {CreateCharacterViewModel} from "@/src/server/presentation/viewModels/CreateCharacterViewModel";
import {GetCharactersViewModel} from "@/src/server/presentation/viewModels/GetCharactersViewModel";
import {ICreateCharacterController} from "@/src/server/presentation/controllers/CreateCharacterController";
import {IGetCharactersController} from "@/src/server/presentation/controllers/GetCharactersController";

export interface IGraphQLCharacterController {
    characters: () => Promise<GetCharactersViewModel['characters']>;
    createCharacter: (character: CreateCharacterRequest) => Promise<CreateCharacterViewModel['createdCharacter']>;
}

interface Dependencies {
    createCharacterController: ICreateCharacterController,
    getCharactersController: IGetCharactersController,
}

export const GraphQLCharacterController = (dependencies: Dependencies): IGraphQLCharacterController => {
    const {createCharacterController, getCharactersController} = dependencies;

    return {
        characters: async () => {
            const viewModel = await getCharactersController.getCharacters();
            return viewModel.characters;
        },
        createCharacter: async ({name, species, homeworld}: CreateCharacterRequest) => {
            const viewModel = await createCharacterController.createCharacter({name, species, homeworld});
            return viewModel.createdCharacter;
        },
    };
}