import {Character} from "@/src/server/domain/Character";

export interface ICharacterRepository {
    getAll(): Promise<Character[]>;

    add(character: Character): Promise<void>;

    clear(): void;
}