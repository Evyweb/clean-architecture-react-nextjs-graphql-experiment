export interface GetCharactersDTO {
    characters: {
        id: string;
        name: string;
        homeworld: string;
        species: string;
    }[];
}