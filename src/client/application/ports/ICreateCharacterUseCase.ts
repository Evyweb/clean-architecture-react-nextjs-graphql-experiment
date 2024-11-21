export interface CreateCharacterUseCaseRequest {
    name: string;
    species: string;
    homeworld: string;
}

export interface ICreateCharacterUseCase {
    execute(characterToCreate: CreateCharacterUseCaseRequest): Promise<void>;
}