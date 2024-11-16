import {Character} from "@/src/client/domain/Character";

export interface Status {
    loading: boolean,
    error?: Error,
    character: Character | null
}