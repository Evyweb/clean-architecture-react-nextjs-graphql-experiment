export interface CreateCharacterFormViewModel {
    name: {
        initialValue: string;
        placeholder: string;
    },
    species: {
        initialValue: string;
        placeholder: string;
    },
    homeworld: {
        initialValue: string;
        placeholder: string;
    },
    isLoading: {
        initialValue: boolean;
    },
    button: {
        text: string;
    }
}