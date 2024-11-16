import {CharacterRepository} from "@/src/server/application/ports/driven/CharacterRepository";
import {CreateCharacterDTO} from "@/src/server/application/usecases/CreateCharacterUseCase/CreateCharacterDTO";
import {Character} from "@/src/server/domain/Character";
import {ICreateCharacterUseCase} from "@/src/server/application/ports/driver/ICreateCharacterUseCase";
import {ICreateCharacterPresenter} from "@/src/server/application/ports/driven/ICreateCharacterPresenter";
import {IdentityProvider} from "@/src/server/application/ports/driven/IdentityProvider";

export class CreateCharacterUseCase implements ICreateCharacterUseCase {
    constructor(
        private readonly characterRepository: CharacterRepository,
        private readonly identityProvider: IdentityProvider,
    ) {
    }

    async execute(characterToCreate: CreateCharacterDTO, presenter: ICreateCharacterPresenter): Promise<void> {
        const characterId = this.identityProvider.generateId();
        const character = new Character(characterId, characterToCreate.name, characterToCreate.species, characterToCreate.homeworld);
        await this.characterRepository.add(character);
        presenter.presentCharacter(character);
    }
}