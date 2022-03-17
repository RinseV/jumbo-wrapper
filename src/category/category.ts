import { JumboObject } from '../base/jumboObject';
import { Query, Headers } from '../jumbo';
import { CategoryModel } from './categoryModel';

export class Category extends JumboObject {
    /**
     * Get category from category ID
     * @param categoryId Category ID
     */
    async getCategoryFromId(categoryId: number, headers?: Headers, query?: Query): Promise<CategoryModel> {
        return this.jumbo.get(`categories`, headers, {
            id: categoryId.toString(),
            ...query
        });
    }
}
