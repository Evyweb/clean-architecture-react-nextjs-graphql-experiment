import {ICharacterRepository} from "@/src/server/application/ports/ICharacterRepository";
import {Character} from "@/src/server/domain/Character";

export const InMemoryCharacterRepository = (): ICharacterRepository => {
    const characters: Character[] = [
        {id: '1', name: 'Luke Skywalker', species: 'Human', homeworld: 'Tatooine'},
        {id: '2', name: 'Darth Vader', species: 'Human', homeworld: 'Tatooine'},
        {id: '3', name: 'Yoda', species: 'Yoda', homeworld: 'Dagobah'},
    ];

    return {
        async getAll(): Promise<Character[]> {
            return characters;
        },
        async add(character: Character): Promise<void> {
            characters.push(character);
        }
    };
}