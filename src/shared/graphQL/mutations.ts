export const CREATE_CHARACTER_MUTATION = `
    mutation createCharacter($name: String!, $species: String!, $homeworld: String!) {
        createCharacter(name: $name, species: $species, homeworld: $homeworld) {
            name
            species
            homeworld
        }
    }
`;