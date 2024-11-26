import {Character} from "@/src/client/domain/Character";

export interface CharacterToCreateDTO {
    name: string;
    species: string;
    homeworld: string;
}

export interface ICharacterRepository {
    createCharacter: (characterToCreate: CharacterToCreateDTO) => Promise<void>;

    getAll: () => Promise<Character[]>;
}