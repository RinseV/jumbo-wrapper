import { Category, Jumbo } from '../src';

describe('Jumbo Category', () => {
    it('should return a Category object', () => {
        const client = new Jumbo();
        expect(client.category()).toBeDefined();
        expect(client.category()).toBeInstanceOf(Category);
    });

    describe('getCategoryFromId', () => {
        it('should have been called with correct parameters', async () => {
            const client = new Jumbo({
                token: 'token'
            });
            const getMock = jest.spyOn(client, 'get');
            getMock.mockImplementation(() => Promise.resolve({}));
            await client.category().getCategoryFromId(1);
            expect(getMock).toHaveBeenCalledWith('categories', {
                query: {
                    id: '1'
                }
            });
        });
    });
});
