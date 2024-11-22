import {GetCharactersDTO} from "@/src/client/infrastructure/GetCharactersDTO";
import {CharacterToCreateDTO} from "@/src/client/application/ports/ICharacterRepository";

export interface IGraphQLAdapter {
    createCharacterMutation: (mutations: { variables: CharacterToCreateDTO }) => Promise<unknown>;
    getCharactersQueryResult: GetCharactersDTO;
}