export const TYPE_DEFS = `
    type Query {
        characters: [Character]
    }
    
    type Mutation {
        createCharacter(name: String!, species: String!, homeworld: String!): Character
    }
    
    type Character {
        id: String
        name: String
        species: String
        homeworld: String
    }
`