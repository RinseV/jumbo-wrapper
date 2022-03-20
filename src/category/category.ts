import { JumboObject } from '../base/jumboObject';
import { AdditionalRequestOptions } from '../jumbo';
import { CategoryModel } from './categoryModel';

export class Category extends JumboObject {
    /**
     * Get category from category ID
     * @param categoryId Category ID
     */
    async getCategoryFromId(
        categoryId: number,
        additionalRequestOptions?: AdditionalRequestOptions
    ): Promise<CategoryModel> {
        return this.jumbo.get(`categories`, {
            query: {
                id: categoryId.toString()
            },
            ...additionalRequestOptions
        });
    }
}
