export interface CreateCharacterUseCaseResponse {
    createdCharacter: {
        id: string;
        name: string;
        species: string;
        homeworld: string;
    };
}