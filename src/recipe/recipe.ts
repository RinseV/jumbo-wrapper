import { JumboObject, PaginationOptions } from '../base/jumboObject';
import { AdditionalRequestOptions } from '../jumbo';
import { RecipeModel } from './recipeModel';
import { RecipeQueryModel } from './recipeQueryModel';

export interface RecipeOptions extends PaginationOptions {}

export class Recipe extends JumboObject {
    /**
     * Get recipe from ID
     * @param recipeId Recipe ID
     */
    async getRecipeFromId(recipeId: number, additionalRequestOptions?: AdditionalRequestOptions): Promise<RecipeModel> {
        return await this.jumbo.get(`recipes/${recipeId}`, additionalRequestOptions);
    }

    /**
     * Get recipes from given recipe name
     * @param recipeName Recipe name to search for
     * @param options Options for the search
     * @param options.offset Offset in search (default 0)
     * @param options.limit Amount of products returned (default 10)
     */
    async getRecipesFromName(
        recipeName: string,
        options?: RecipeOptions,
        additionalRequestOptions?: AdditionalRequestOptions
    ): Promise<RecipeModel[]> {
        const recipes: RecipeQueryModel = await this.jumbo.get(`recipes`, {
            query: {
                q: recipeName,
                offset: (options?.offset || 0).toString(),
                limit: (options?.limit || 10).toString()
            },
            ...additionalRequestOptions
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
     * Get recipes from given filter ID
     * @param filterId Recipe filter ID
     * @param options Options for the search
     * @param options.offset Offset in search (default 0)
     * @param options.limit Amount of products returned (default 10)
     */
    async getRecipesFromFilterId(
        filterId: number,
        options?: RecipeOptions,
        additionalRequestOptions?: AdditionalRequestOptions
    ) {
        const recipes: RecipeQueryModel = await this.jumbo.get(`recipes`, {
            query: {
                filterId: filterId.toString(),
                offset: (options?.offset || 0).toString(),
                limit: (options?.limit || 10).toString()
            },
            ...additionalRequestOptions
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
