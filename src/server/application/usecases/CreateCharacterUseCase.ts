import {ICharacterRepository} from "@/src/server/application/ports/ICharacterRepository";
import {Character} from "@/src/server/domain/Character";
import {
    CreateCharacterUseCaseRequest,
    ICreateCharacterUseCase
} from "@/src/server/application/ports/ICreateCharacterUseCase";
import {ICreateCharacterPresenter} from "@/src/server/application/ports/ICreateCharacterPresenter";
import {IIdentityProvider} from "@/src/server/application/ports/IIdentityProvider";

interface Dependencies {
    characterRepository: ICharacterRepository;
    identityProvider: IIdentityProvider;
}

export const CreateCharacterUseCase = (
    {characterRepository, identityProvider}: Dependencies
): ICreateCharacterUseCase => {
    return {
        async execute(characterToCreate: CreateCharacterUseCaseRequest, presenter: ICreateCharacterPresenter): Promise<void> {
            const characterId = identityProvider.generateId();
            const character: Character = {
                id: characterId,
                name: characterToCreate.name,
                species: characterToCreate.species,
                homeworld: characterToCreate.homeworld
            };
            await characterRepository.add(character);
            presenter.presentCharacter(character);
        }
    };
}