export class Character {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly species: string,
        public readonly homeworld: string
    ) {
    }
}