type CharacterDTO = {
    id: string;
    name: string;
    homeworld: string;
    species: string;
};

export interface GetCharactersDTO {
    characters: CharacterDTO[];
}