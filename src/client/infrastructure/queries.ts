export const GET_CHARACTERS = `
    query GetCharacters {
        characters {
            id
            name
            species
            homeworld
        }
    }
`;

export const CREATE_CHARACTER = `
    mutation CreateCharacter($name: String!, $species: String!, $homeworld: String!) {
        createCharacter(name: $name, species: $species, homeworld: $homeworld) {
            id
            name
            species
            homeworld
        }
    }
`;