export interface LoadCharactersViewModel {
    characters: {
        id: string;
        name: string;
        description: string;
        loadedFrom: string;
    }[]
}