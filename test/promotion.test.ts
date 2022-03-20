import { Jumbo, Promotion } from '../src';

describe('Jumbo Promotion', () => {
    it('should return a Promotion object', () => {
        const client = new Jumbo();
        expect(client.promotion()).toBeDefined();
        expect(client.promotion()).toBeInstanceOf(Promotion);
    });

    describe('getPromotionsFromStore', () => {
        it('should have been called with correct parameters', async () => {
            const client = new Jumbo();
            const getMock = jest.spyOn(client, 'get');
            getMock.mockImplementation(() => Promise.resolve({}));
            await client.promotion().getPromotionsFromStore(1);
            expect(getMock).toHaveBeenCalledWith('promotion-overview', {
                query: {
                    store_id: '1'
                }
            });
        });
    });
});
