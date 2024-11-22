import {ICharacterRepository} from "@/src/server/application/ports/ICharacterRepository";
import {Character} from "@/src/server/domain/Character";
import {ICreateCharacterUseCase} from "@/src/server/application/ports/ICreateCharacterUseCase";
import {ICreateCharacterPresenter} from "@/src/server/application/ports/ICreateCharacterPresenter";
import {IIdentityProvider} from "@/src/server/application/ports/IIdentityProvider";
import {CreateCharacterUseCaseRequest} from "@/src/server/application/usecases/CreateCharacter/CreateCharacterUseCaseRequest";
import {CreateCharacterUseCaseResponse} from "@/src/server/application/usecases/CreateCharacter/CreateCharacterUseCaseResponse";

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
            const response: CreateCharacterUseCaseResponse = {
                createdCharacter: {
                    id: character.id,
                    name: character.name,
                    species: character.species,
                    homeworld: character.homeworld
                }
            };
            presenter.present(response);
        }
    };
}