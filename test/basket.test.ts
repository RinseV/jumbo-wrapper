import { Basket, Jumbo } from '../src';

describe('Jumbo Basket', () => {
    it('should return a Basket object', () => {
        const client = new Jumbo();
        expect(client.basket()).toBeDefined();
        expect(client.basket()).toBeInstanceOf(Basket);
    });

    describe('getMyBasket', () => {
        it('should have been called with correct parameters', async () => {
            const client = new Jumbo();
            const getMock = jest.spyOn(client, 'get');
            getMock.mockImplementation(() => Promise.resolve({}));
            await client.basket().getMyBasket();
            expect(getMock).toHaveBeenCalledWith('basket', undefined);
        });
    });

    describe('updateBasket', () => {
        it('should have been called with correct parameters', async () => {
            const client = new Jumbo();
            const putMock = jest.spyOn(client, 'put');
            putMock.mockImplementation(() => Promise.resolve({}));
            await client.basket().updateBasket({
                items: [
                    {
                        quantity: 1,
                        sku: '203773STK',
                        unit: 'pieces'
                    }
                ],
                vagueTerms: []
            });
            expect(putMock).toHaveBeenCalledWith(
                'basket',
                {
                    items: [
                        {
                            quantity: 1,
                            sku: '203773STK',
                            unit: 'pieces'
                        }
                    ],
                    vagueTerms: []
                },
                undefined
            );
        });
    });
});
