import { Jumbo, Store } from '../src';

const mockedStore = {
    id: '1'
};

const mockedStores = {
    filters: {
        data: []
    },
    stores: {
        data: [mockedStore]
    }
};

describe('Jumbo Store', () => {
    it('should return a Store object', () => {
        const client = new Jumbo();
        expect(client.store()).toBeDefined();
        expect(client.store()).toBeInstanceOf(Store);
    });

    describe('getStoreFromId', () => {
        it('should have been called with correct parameters', async () => {
            const client = new Jumbo();
            const getMock = jest.spyOn(client, 'get');
            getMock.mockImplementation(() => Promise.resolve({}));
            await client.store().getStoreFromId(1);
            expect(getMock).toHaveBeenCalledWith('stores/1', undefined);
        });
    });

    describe('getStoresFromLongLat', () => {
        it('should have been called with provided options & defaults', async () => {
            const client = new Jumbo();
            const getMock = jest.spyOn(client, 'get');
            getMock.mockImplementation(() => Promise.resolve(mockedStores));
            await client.store().getStoresFromLongLat({
                long: 1,
                lat: 1
            });
            expect(getMock).toHaveBeenCalledWith('stores', {
                query: {
                    longitude: '1',
                    latitude: '1',
                    distance: '',
                    count: '20',
                    offset: '0'
                }
            });
        });

        it('should have been called with provided options', async () => {
            const client = new Jumbo();
            const getMock = jest.spyOn(client, 'get');
            getMock.mockImplementation(() => Promise.resolve(mockedStores));
            await client.store().getStoresFromLongLat({
                long: 1,
                lat: 1,
                distance: 1,
                limit: 1,
                offset: 1
            });
            expect(getMock).toHaveBeenCalledWith('stores', {
                query: {
                    longitude: '1',
                    latitude: '1',
                    distance: '1',
                    count: '1',
                    offset: '1'
                }
            });
        });
    });
});
