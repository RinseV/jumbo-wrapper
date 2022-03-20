import { Jumbo, Recipe } from '../src';

const mockedRecipe = {
    id: '1'
};

const mockedRecipes = {
    filters: {
        data: []
    },
    recipes: {
        data: [mockedRecipe]
    }
};

describe('Jumbo Recipe', () => {
    it('should return a Recipe object', () => {
        const client = new Jumbo();
        expect(client.recipe()).toBeDefined();
        expect(client.recipe()).toBeInstanceOf(Recipe);
    });

    describe('getRecipeFromId', () => {
        it('should have been called with correct parameters', async () => {
            const client = new Jumbo();
            const getMock = jest.spyOn(client, 'get');
            getMock.mockImplementation(() => Promise.resolve({}));
            await client.recipe().getRecipeFromId(1);
            expect(getMock).toHaveBeenCalledWith('recipes/1', undefined);
        });
    });

    describe('getRecipesFromName', () => {
        it('should have been called with default parameters', async () => {
            const client = new Jumbo();
            const getMock = jest.spyOn(client, 'get');
            getMock.mockImplementation(() => Promise.resolve(mockedRecipes));
            await client.recipe().getRecipesFromName('test');
            expect(getMock).toHaveBeenCalledWith('recipes', {
                query: {
                    q: 'test',
                    offset: '0',
                    limit: '10'
                }
            });
        });

        it('should have been called with provided options', async () => {
            const client = new Jumbo();
            const getMock = jest.spyOn(client, 'get');
            getMock.mockImplementation(() => Promise.resolve(mockedRecipes));
            await client.recipe().getRecipesFromName('test', {
                limit: 1,
                offset: 1
            });
            expect(getMock).toHaveBeenCalledWith('recipes', {
                query: {
                    q: 'test',
                    offset: '1',
                    limit: '1'
                }
            });
        });
    });

    describe('getRecipesFromFilterId', () => {
        it('should have been called with default parameters', async () => {
            const client = new Jumbo();
            const getMock = jest.spyOn(client, 'get');
            getMock.mockImplementation(() => Promise.resolve(mockedRecipes));
            await client.recipe().getRecipesFromFilterId(1);
            expect(getMock).toHaveBeenCalledWith('recipes', {
                query: {
                    filterId: '1',
                    offset: '0',
                    limit: '10'
                }
            });
        });

        it('should have been called with provided options', async () => {
            const client = new Jumbo();
            const getMock = jest.spyOn(client, 'get');
            getMock.mockImplementation(() => Promise.resolve(mockedRecipes));
            await client.recipe().getRecipesFromFilterId(1, {
                limit: 1,
                offset: 1
            });
            expect(getMock).toHaveBeenCalledWith('recipes', {
                query: {
                    filterId: '1',
                    offset: '1',
                    limit: '1'
                }
            });
        });
    });
});
