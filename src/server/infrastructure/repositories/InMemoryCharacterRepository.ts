import {CharacterRepository} from "@/src/server/application/ports/driven/CharacterRepository";
import {Character} from "@/src/server/domain/Character";

export class InMemoryCharacterRepository implements CharacterRepository {
    private characters: Character[] = [
        {id: '1', name: 'Luke Skywalker', species: 'Human', homeworld: 'Tatooine'},
        {id: '2', name: 'Darth Vader', species: 'Human', homeworld: 'Tatooine'},
        {id: '3', name: 'Yoda', species: 'Yoda', homeworld: 'Dagobah'},
    ];

    async getAll(): Promise<Character[]> {
        return this.characters;
    }

    async add(character: Character): Promise<void> {
        this.characters.push(character);
    }
}