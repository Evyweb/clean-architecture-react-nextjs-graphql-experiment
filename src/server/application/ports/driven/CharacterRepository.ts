import {Character} from "@/src/server/domain/Character";

export interface CharacterRepository {
    getAll(): Promise<Character[]>;
    add(character: Character): Promise<void>;
}