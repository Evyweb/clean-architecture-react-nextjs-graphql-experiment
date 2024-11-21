import {IIdentityProvider} from "@/src/server/application/ports/driven/IIdentityProvider";

export class FakeIdentityProvider implements IIdentityProvider {
    public nextId: string = '11111111-1111-1111-1111-111111111111';

    generateId(): string {
        return this.nextId;
    }
}