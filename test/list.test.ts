import { Jumbo, List } from '../src';

describe('Jumbo List', () => {
    it('should return a List object', () => {
        const client = new Jumbo();
        expect(client.list()).toBeDefined();
        expect(client.list()).toBeInstanceOf(List);
    });

    describe('getMyLists', () => {
        it('should have been called with correct parameters', async () => {
            const client = new Jumbo({
                token: 'token'
            });
            const getMock = jest.spyOn(client, 'get');
            getMock.mockImplementation(() => Promise.resolve({}));
            await client.list().getMyLists();
            expect(getMock).toHaveBeenCalledWith('lists/mylists', undefined, true);
        });

        it('should error when no auth is provided', async () => {
            const client = new Jumbo();
            const getMock = jest.spyOn(client, 'get');
            getMock.mockImplementation(() => Promise.resolve({}));
            try {
                await client.list().getMyLists();
            } catch (error) {
                expect(error).toBeDefined();
            }
        });
    });

    describe('getListFromId', () => {
        it('should have been called with correct parameters', async () => {
            const client = new Jumbo();
            const getMock = jest.spyOn(client, 'get');
            getMock.mockImplementation(() => Promise.resolve({}));
            await client.list().getListFromId('id');
            expect(getMock).toHaveBeenCalledWith('lists/id', undefined, false);
        });
    });

    describe('getListsByName', () => {
        it('should have been called with default parameters', async () => {
            const client = new Jumbo();
            const getMock = jest.spyOn(client, 'get');
            getMock.mockImplementation(() => Promise.resolve({}));
            await client.list().getListsByName('Test List');
            expect(getMock).toHaveBeenCalledWith(
                'lists/search',
                {
                    query: {
                        limit: '10',
                        offset: '0',
                        q: 'Test List'
                    }
                },
                false
            );
        });

        it('should have been called with provided options', async () => {
            const client = new Jumbo();
            const getMock = jest.spyOn(client, 'get');
            getMock.mockImplementation(() => Promise.resolve({}));
            await client.list().getListsByName('Test List', {
                limit: 1,
                offset: 2
            });
            expect(getMock).toHaveBeenCalledWith(
                'lists/search',
                {
                    query: {
                        limit: '1',
                        offset: '2',
                        q: 'Test List'
                    }
                },
                false
            );
        });
    });

    describe('getPopularLists', () => {
        it('should have been called with default parameters', async () => {
            const client = new Jumbo();
            const getMock = jest.spyOn(client, 'get');
            getMock.mockImplementation(() => Promise.resolve({}));
            await client.list().getPopularLists();
            expect(getMock).toHaveBeenCalledWith(
                'lists/search',
                {
                    query: {
                        limit: '10',
                        offset: '0',
                        q: ''
                    }
                },
                false
            );
        });

        it('should have been called with provided options', async () => {
            const client = new Jumbo();
            const getMock = jest.spyOn(client, 'get');
            getMock.mockImplementation(() => Promise.resolve({}));
            await client.list().getPopularLists({
                limit: 1,
                offset: 2
            });
            expect(getMock).toHaveBeenCalledWith(
                'lists/search',
                {
                    query: {
                        limit: '1',
                        offset: '2',
                        q: ''
                    }
                },
                false
            );
        });
    });

    describe('getItemsFromList', () => {
        it('should have been called with default parameters', async () => {
            const client = new Jumbo();
            const getMock = jest.spyOn(client, 'get');
            getMock.mockImplementation(() => Promise.resolve({}));
            await client.list().getItemsFromList('id');
            expect(getMock).toHaveBeenCalledWith(
                'lists/id/items',
                {
                    query: {
                        limit: '10',
                        offset: '0'
                    }
                },
                false
            );
        });

        it('should have been called with provided options', async () => {
            const client = new Jumbo();
            const getMock = jest.spyOn(client, 'get');
            getMock.mockImplementation(() => Promise.resolve({}));
            await client.list().getItemsFromList('id', {
                limit: 1,
                offset: 2
            });
            expect(getMock).toHaveBeenCalledWith(
                'lists/id/items',
                {
                    query: {
                        limit: '1',
                        offset: '2'
                    }
                },
                false
            );
        });
    });

    describe('getMySmartLists', () => {
        it('should have been called with correct parameters', async () => {
            const client = new Jumbo({
                token: 'token'
            });
            const getMock = jest.spyOn(client, 'get');
            getMock.mockImplementation(() => Promise.resolve({}));
            await client.list().getMySmartLists();
            expect(getMock).toHaveBeenCalledWith('users/me/smart-lists', undefined, true);
        });

        it('should error when no auth is provided', async () => {
            const client = new Jumbo();
            const getMock = jest.spyOn(client, 'get');
            getMock.mockImplementation(() => Promise.resolve({}));
            try {
                await client.list().getMySmartLists();
            } catch (error) {
                expect(error).toBeDefined();
            }
        });
    });

    describe('getMyFollowedLists', () => {
        it('should have been called with correct parameters', async () => {
            const client = new Jumbo({
                token: 'token'
            });
            const getMock = jest.spyOn(client, 'get');
            getMock.mockImplementation(() => Promise.resolve({}));
            await client.list().getMyFollowedLists();
            expect(getMock).toHaveBeenCalledWith('lists/following', undefined, true);
        });

        it('should error when no auth is provided', async () => {
            const client = new Jumbo();
            const getMock = jest.spyOn(client, 'get');
            getMock.mockImplementation(() => Promise.resolve({}));
            try {
                await client.list().getMyFollowedLists();
            } catch (error) {
                expect(error).toBeDefined();
            }
        });
    });

    describe('isFollowingList', () => {
        it('should have been called with the correct parameters', async () => {
            const client = new Jumbo({
                token: 'token'
            });
            const getMock = jest.spyOn(client, 'get');
            getMock.mockImplementation(() => Promise.resolve({}));
            await client.list().isFollowingList('id');
            expect(getMock).toHaveBeenCalledWith('lists/id/following', undefined, true);
        });

        it('should error when no auth is provided', async () => {
            const client = new Jumbo();
            const getMock = jest.spyOn(client, 'get');
            getMock.mockImplementation(() => Promise.resolve({}));
            try {
                await client.list().isFollowingList('id');
            } catch (error) {
                expect(error).toBeDefined();
            }
        });
    });

    describe('followList', () => {
        it('should have been called with the correct parameters', async () => {
            const client = new Jumbo({
                token: 'token'
            });
            const putMock = jest.spyOn(client, 'put');
            putMock.mockImplementation(() => Promise.resolve({}));
            await client.list().followList('id');
            expect(putMock).toHaveBeenCalledWith('lists/id/follow', undefined, undefined, true);
        });

        it('should error when no auth is provided', async () => {
            const client = new Jumbo();
            const putMock = jest.spyOn(client, 'put');
            putMock.mockImplementation(() => Promise.resolve({}));
            try {
                await client.list().followList('id');
            } catch (error) {
                expect(error).toBeDefined();
            }
        });
    });

    describe('unfollowList', () => {
        it('should have been called with the correct parameters', async () => {
            const client = new Jumbo({
                token: 'token'
            });
            const putMock = jest.spyOn(client, 'put');
            putMock.mockImplementation(() => Promise.resolve({}));
            await client.list().unfollowList('id');
            expect(putMock).toHaveBeenCalledWith('lists/id/unfollow', undefined, undefined, true);
        });

        it('should error when no auth is provided', async () => {
            const client = new Jumbo();
            const putMock = jest.spyOn(client, 'put');
            putMock.mockImplementation(() => Promise.resolve({}));
            try {
                await client.list().unfollowList('id');
            } catch (error) {
                expect(error).toBeDefined();
            }
        });
    });
});
