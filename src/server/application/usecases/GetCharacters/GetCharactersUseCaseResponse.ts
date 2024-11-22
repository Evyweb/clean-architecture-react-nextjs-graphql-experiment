export interface GetCharactersUseCaseResponse {
    characters: {
        id: string;
        name: string;
        species: string;
        homeworld: string;
    }[];
}