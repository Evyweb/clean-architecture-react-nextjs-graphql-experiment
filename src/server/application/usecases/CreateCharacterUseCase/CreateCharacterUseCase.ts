import {ICharacterRepository} from "@/src/server/application/ports/driven/ICharacterRepository";
import {CreateCharacterDTO} from "@/src/server/application/usecases/CreateCharacterUseCase/CreateCharacterDTO";
import {Character} from "@/src/server/domain/Character";
import {ICreateCharacterUseCase} from "@/src/server/application/ports/driver/ICreateCharacterUseCase";
import {ICreateCharacterPresenter} from "@/src/server/application/ports/driven/ICreateCharacterPresenter";
import {IIdentityProvider} from "@/src/server/application/ports/driven/IIdentityProvider";

export class CreateCharacterUseCase implements ICreateCharacterUseCase {
    constructor(
        private readonly characterRepository: ICharacterRepository,
        private readonly identityProvider: IIdentityProvider,
    ) {
    }

    async execute(characterToCreate: CreateCharacterDTO, presenter: ICreateCharacterPresenter): Promise<void> {
        const characterId = this.identityProvider.generateId();
        const character = new Character(characterId, characterToCreate.name, characterToCreate.species, characterToCreate.homeworld);
        await this.characterRepository.add(character);
        presenter.presentCharacter(character);
    }
}