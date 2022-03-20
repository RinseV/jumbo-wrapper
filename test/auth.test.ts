import { Jumbo } from '../src';
import { TokenHandler } from '../src/auth/tokenHandler';

describe('TokenHandler', () => {
    it('should generate a token', async () => {
        const client = new Jumbo();
        // Mock post call
        const postSpy = jest.spyOn(client, 'post').mockReturnValue(
            Promise.resolve({
                headers: {
                    'x-jumbo-token': 'token'
                }
            })
        );
        const tokenHandler = new TokenHandler(client, 'username', 'password');
        await tokenHandler.Ready;
        expect(tokenHandler.getToken()).toBe('token');
        expect(postSpy).toHaveBeenCalledTimes(1);
    });

    it('should not generate a token', async () => {
        const client = new Jumbo();
        const tokenHandler = new TokenHandler(client, '', '', 'token');
        await tokenHandler.Ready;
        expect(tokenHandler.getToken()).toBe('token');
    });
});
