import {randomUUID} from 'node:crypto';
import {IIdentityProvider} from "@/src/server/application/ports/driven/IIdentityProvider";

export class UuidIdentityProvider implements IIdentityProvider {
    generateId(): string {
        return randomUUID();
    }
}