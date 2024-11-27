import {UuidIdentityProvider} from "@/src/server/infrastructure/UuidIdentityProvider";

describe('UuidIdentityProvider', () => {
    it('should generate a random UUID', () => {
        // Arrange
        const uuidIdentityProvider = UuidIdentityProvider();
        const UUID_FORMAT = /^[0-9a-f]{8}-([0-9a-f]{4}-){3}[0-9a-f]{12}$/;

        // Act
        const id = uuidIdentityProvider.generateId();

        // Assert
        expect(id).toMatch(UUID_FORMAT);
    });
});