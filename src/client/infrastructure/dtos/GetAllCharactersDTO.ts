export interface GetAllCharactersDTO {
    characters: {
        id: string;
        name: string;
        homeworld: string;
        species: string;
    }[];
}