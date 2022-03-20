import { Jumbo, Order, OrderStatus } from '../src';

const mockedOrder = {
    order: {
        data: {
            delivery: {
                date: new Date().getTime(),
                collectionDateTime: new Date().getTime()
            },
            shipping: {
                plannedETAStart: new Date().getTime(),
                plannedETAEnd: new Date().getTime(),
                liveETA: new Date().getTime(),
                unknownLiveETA: false
            }
        }
    }
};

const mockedOrders = {
    orders: {
        data: [
            {
                delivery: {
                    date: new Date().getTime(),
                    collectionDateTime: new Date().getTime()
                }
            }
        ]
    }
};

describe('Jumbo Order', () => {
    it('should return an Order object', () => {
        const client = new Jumbo();
        expect(client.order()).toBeDefined();
        expect(client.order()).toBeInstanceOf(Order);
    });

    describe('getMyOrderById', () => {
        it('should have been called with correct parameters', async () => {
            const client = new Jumbo({
                token: 'token'
            });
            const getMock = jest.spyOn(client, 'get');
            getMock.mockImplementation(() => Promise.resolve(mockedOrder));
            await client.order().getMyOrderById(1);
            expect(getMock).toHaveBeenCalledWith('users/me/orders/1', undefined, true);
        });

        it('should error when no auth is provided', async () => {
            const client = new Jumbo();
            const getMock = jest.spyOn(client, 'get');
            getMock.mockImplementation(() => Promise.resolve({}));
            try {
                await client.order().getMyOrderById(1);
            } catch (e) {
                expect(e).toBeDefined();
            }
        });
    });

    describe('getMyOrders', () => {
        it('should have been called with default parameters', async () => {
            const client = new Jumbo({
                token: 'token'
            });
            const getMock = jest.spyOn(client, 'get');
            getMock.mockImplementation(() => Promise.resolve(mockedOrders));
            await client.order().getMyOrders();
            expect(getMock).toHaveBeenCalledWith(
                'users/me/orders',
                {
                    query: {
                        offset: '0',
                        count: '10'
                    }
                },
                true
            );
        });

        it('should have been called with custom parameters', async () => {
            const client = new Jumbo({
                token: 'token'
            });
            const getMock = jest.spyOn(client, 'get');
            getMock.mockImplementation(() => Promise.resolve(mockedOrders));
            await client.order().getMyOrders({
                limit: 1,
                offset: 1
            });
            expect(getMock).toHaveBeenCalledWith(
                'users/me/orders',
                {
                    query: {
                        offset: '1',
                        count: '1'
                    }
                },
                true
            );
        });

        it('should error when no auth is provided', async () => {
            const client = new Jumbo();
            const getMock = jest.spyOn(client, 'get');
            getMock.mockImplementation(() => Promise.resolve({}));
            try {
                await client.order().getMyOrders();
            } catch (e) {
                expect(e).toBeDefined();
            }
        });
    });

    describe('getMyLatestOrder', () => {
        it('should have been called with correct parameters', async () => {
            const client = new Jumbo({
                token: 'token'
            });
            const getMock = jest.spyOn(client, 'get');
            getMock.mockImplementation(() => Promise.resolve(mockedOrders));
            await client.order().getMyLatestOrder();
            expect(getMock).toHaveBeenCalledWith(
                'users/me/orders',
                {
                    query: {
                        offset: '0',
                        count: '1'
                    }
                },
                true
            );
        });

        it('should error when no auth is provided', async () => {
            const client = new Jumbo();
            const getMock = jest.spyOn(client, 'get');
            getMock.mockImplementation(() => Promise.resolve({}));
            try {
                await client.order().getMyLatestOrder();
            } catch (e) {
                expect(e).toBeDefined();
            }
        });
    });

    describe('getMyOrdersByStatus', () => {
        it('should have been called with correct parameters', async () => {
            const client = new Jumbo({
                token: 'token'
            });
            const getMock = jest.spyOn(client, 'get');
            getMock.mockImplementation(() => Promise.resolve(mockedOrders));
            await client.order().getMyOrdersByStatus(OrderStatus.Open);
            expect(getMock).toHaveBeenCalledWith(
                'users/me/orders',
                {
                    query: {
                        offset: '0',
                        count: '10'
                    }
                },
                true
            );
        });

        it('should error when no auth is provided', async () => {
            const client = new Jumbo();
            const getMock = jest.spyOn(client, 'get');
            getMock.mockImplementation(() => Promise.resolve({}));
            try {
                await client.order().getMyOrdersByStatus(OrderStatus.Open);
            } catch (e) {
                expect(e).toBeDefined();
            }
        });
    });

    describe('getMyRelevantOrders', () => {
        it('should have been called with correct parameters', async () => {
            const client = new Jumbo({
                token: 'token'
            });
            const getMock = jest.spyOn(client, 'get');
            getMock.mockImplementation(() => Promise.resolve(mockedOrders));
            await client.order().getMyRelevantOrders();
            expect(getMock).toHaveBeenCalledWith(
                'users/me/orders',
                {
                    query: {
                        relevant: 'true'
                    }
                },
                true
            );
        });

        it('should error when no auth is provided', async () => {
            const client = new Jumbo();
            const getMock = jest.spyOn(client, 'get');
            getMock.mockImplementation(() => Promise.resolve({}));
            try {
                await client.order().getMyRelevantOrders();
            } catch (e) {
                expect(e).toBeDefined();
            }
        });
    });

    describe('convert dates', () => {
        it('should convert the delivery timestamp to dates', async () => {
            const client = new Jumbo({
                token: 'token'
            });
            const getMock = jest.spyOn(client, 'get');
            getMock.mockImplementation(() => Promise.resolve(mockedOrder));
            const response = await client.order().getMyOrderById(1);
            expect(getMock).toHaveBeenCalledWith('users/me/orders/1', undefined, true);
            expect(response.order.data.delivery.date).toBeInstanceOf(Date);
        });
    });
});
