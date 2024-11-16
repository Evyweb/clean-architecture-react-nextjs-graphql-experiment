import {CreateCharacterDTO} from "@/src/client/application/usecases/CreateCharacter/CreateCharacterDTO";
import {ICreateCharacterUseCase} from "@/src/client/application/ports/driver/ICreateCharacterUseCase";
import {useDependency} from "@/src/client/presentation/hooks/useDependency";

export const useCreateCharacterUseCase = (): ICreateCharacterUseCase => {
    const repository = useDependency('characterRepository');
    return {
        execute: async (characterToCreate: CreateCharacterDTO): Promise<void> => {
            await repository.createCharacter(characterToCreate);
        }
    };
}