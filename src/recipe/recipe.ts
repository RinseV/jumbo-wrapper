import { Headers, Query } from '../jumbo';
import { RecipeModel } from './recipeModel';
import { JumboObject } from '../base/jumboObject';
import { RecipeQueryModel } from './recipeQueryModel';

export class Recipe extends JumboObject {
    /**
     * Get recipe from ID
     * @param recipeId Recipe ID
     */
    async getRecipeFromId(recipeId: number, headers?: Headers, query?: Query): Promise<RecipeModel> {
        return await this.jumbo.get(`recipes/${recipeId}`, headers, query);
    }

    /**
     * Get recipes from given recipe name
     * @param recipeName Recipe name to search for
     * @param offset Offset in search (default 0)
     * @param count Amount of recipes returned (default 10)
     */
    async getRecipesFromName(
        recipeName: string,
        offset?: number,
        count?: number,
        headers?: Headers,
        query?: Query
    ): Promise<RecipeModel[]> {
        const recipes: RecipeQueryModel = await this.jumbo.get(`recipes`, headers, {
            q: recipeName,
            offset: (offset ? offset : 0).toString(),
            limit: (count ? count : 10).toString(),
            ...query
        });
        const result: RecipeModel[] = [];
        for (var key in recipes.recipes.data) {
            const recipe: RecipeModel = {
                recipe: {
                    data: recipes.recipes.data[key]
                }
            };
            result.push(recipe);
        }
        return result;
    }

    /**
     * Shortcut function to get the first recipe when searching for name
     * @param recipeName Recipe name to search for
     */
    async getFirstRecipeFromName(recipeName: string, headers?: Headers, query?: Query): Promise<RecipeModel> {
        const recipe = await this.getRecipesFromName(recipeName, 0, 1, headers, query);
        return recipe[0];
    }

    /**
     * Get recipes from given filter ID
     * @param filterId Recipe filter ID
     * @param offset Offset in search (default 0)
     * @param count Amount of recipes returned (default 10)
     */
    async getRecipesFromFilterId(filterId: number, offset?: number, count?: number, headers?: Headers, query?: Query) {
        const recipes: RecipeQueryModel = await this.jumbo.get(`recipes`, headers, {
            filterId: filterId.toString(),
            offset: (offset ? offset : 0).toString(),
            limit: (count ? count : 10).toString(),
            ...query
        });
        const result: RecipeModel[] = [];
        for (var key in recipes.recipes.data) {
            const recipe: RecipeModel = {
                recipe: {
                    data: recipes.recipes.data[key]
                }
            };
            result.push(recipe);
        }
        return result;
    }
}
