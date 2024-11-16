import {CreateCharacterDTO} from "@/src/client/application/usecases/CreateCharacter/CreateCharacterDTO";

export interface ICreateCharacterUseCase {
    execute(characterToCreate: CreateCharacterDTO): Promise<void>;
}