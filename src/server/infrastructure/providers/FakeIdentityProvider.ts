import {IdentityProvider} from "@/src/server/application/ports/driven/IdentityProvider";

export class FakeIdentityProvider implements IdentityProvider {
    public nextId: string = '11111111-1111-1111-1111-111111111111';

    generateId(): string {
        return this.nextId;
    }
}