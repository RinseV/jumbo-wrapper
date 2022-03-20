import { Jumbo, Product, ProductAllergenFilter, ProductDietFilter, ProductSortOptions } from '../src';

const mockedProduct = {
    id: '1'
};

const mockedProducts = {
    products: {
        data: [mockedProduct]
    }
};

describe('Jumbo Product', () => {
    it('should return a Product object', () => {
        const client = new Jumbo();
        expect(client.product()).toBeDefined();
        expect(client.product()).toBeInstanceOf(Product);
    });

    describe('getProductFromId', () => {
        it('should have been called with correct parameters', async () => {
            const client = new Jumbo();
            const getMock = jest.spyOn(client, 'get');
            getMock.mockImplementation(() => Promise.resolve({}));
            await client.product().getProductFromId('1');
            expect(getMock).toHaveBeenCalledWith('products/1', undefined);
        });
    });

    describe('getProductsFromName', () => {
        it('should have been called with default parameters', async () => {
            const client = new Jumbo();
            const getMock = jest.spyOn(client, 'get');
            getMock.mockImplementation(() => Promise.resolve(mockedProducts));
            await client.product().getProductsFromName('1');
            expect(getMock).toHaveBeenCalledWith('search', {
                query: {
                    q: '1',
                    offset: '0',
                    limit: '10',
                    sort: ''
                }
            });
        });

        it('should have been called with provided options', async () => {
            const client = new Jumbo();
            const getMock = jest.spyOn(client, 'get');
            getMock.mockImplementation(() => Promise.resolve(mockedProducts));
            await client.product().getProductsFromName('1', {
                limit: 1,
                offset: 1,
                sort: ProductSortOptions.POPULAR,
                filters: {
                    diet: [ProductDietFilter.GlutenIntolerant],
                    allergens: [ProductAllergenFilter.Gluten],
                    other: [1234]
                }
            });
            expect(getMock).toHaveBeenCalledWith('search', {
                query: {
                    q: '1',
                    offset: '1',
                    limit: '1',
                    sort: ProductSortOptions.POPULAR,
                    filters: `${ProductDietFilter.GlutenIntolerant} ${ProductAllergenFilter.Gluten} 1234`
                }
            });
        });
    });
});
