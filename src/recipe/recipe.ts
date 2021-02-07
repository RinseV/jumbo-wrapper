import { Headers, Query } from '../jumbo';
import { RecipeModel } from './recipeModel';
import { JumboObject } from '../base/jumboObject';

export class Recipe extends JumboObject {
    /**
     * Get recipe from ID
     * @param recipeId Recipe ID
     */
    async getRecipeFromId(
        recipeId: number,
        headers?: Headers,
        query?: Query
    ): Promise<RecipeModel> {
        return await this.jumbo.get(`recipes/${recipeId}`, headers, query);
    }
}
