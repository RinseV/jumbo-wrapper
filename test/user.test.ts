import { Jumbo, User } from '../src';

describe('Jumbo User', () => {
    it('should return a User object', () => {
        const client = new Jumbo();
        expect(client.user()).toBeDefined();
        expect(client.user()).toBeInstanceOf(User);
    });

    describe('getMyInfo', () => {
        it('should have been called with correct parameters', async () => {
            const client = new Jumbo({
                token: 'token'
            });
            const getMock = jest.spyOn(client, 'get');
            getMock.mockImplementation(() => Promise.resolve({}));
            await client.user().getMyInfo();
            expect(getMock).toHaveBeenCalledWith('users/me', undefined, true);
        });

        it('should error when no auth is provided', async () => {
            const client = new Jumbo();
            const getMock = jest.spyOn(client, 'get');
            getMock.mockImplementation(() => Promise.resolve({}));
            try {
                await client.user().getMyInfo();
            } catch (error) {
                expect(error).toBeDefined();
            }
        });
    });
});
