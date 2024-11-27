import {ICharacterRepository} from "@/src/server/application/ports/ICharacterRepository";
import {Character} from "@/src/server/domain/Character";

export const InMemoryCharacterRepository = (existingCharacters: Character[]): ICharacterRepository => {
    const characters: Character[] = existingCharacters;

    return {
        async getAll(): Promise<Character[]> {
            return characters;
        },
        async add(character: Character): Promise<void> {
            characters.push(character);
        },
        clear(): void {
            characters.length = 0;
        }
    };
}