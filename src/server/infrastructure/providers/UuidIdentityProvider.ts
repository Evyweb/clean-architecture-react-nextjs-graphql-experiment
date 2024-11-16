import {randomUUID} from 'node:crypto';
import {IdentityProvider} from "@/src/server/application/ports/driven/IdentityProvider";

export class UuidIdentityProvider implements IdentityProvider {
    generateId(): string {
        return randomUUID();
    }
}