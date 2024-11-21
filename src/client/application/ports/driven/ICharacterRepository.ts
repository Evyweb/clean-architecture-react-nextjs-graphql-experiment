import {CreateCharacterDTO} from "@/src/client/application/usecases/CreateCharacter/CreateCharacterDTO";
import {Character} from "@/src/client/domain/Character";

export interface ICharacterRepository {
    createCharacter: (characterToCreate: CreateCharacterDTO) => Promise<void>;

    getAll: () => Character[];
}