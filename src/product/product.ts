import { Headers, Query } from '../jumbo';
import { JumboObject } from '../base/jumboObject';
import { ProductModel } from './productModel';
import { ProductQueryModel, ProductSortOptions } from './productQueryModel';

export class Product extends JumboObject {
    /**
     * Gets product from ID
     * @param productId Product ID
     */
    async getProductFromId(
        productId: string,
        headers?: Headers,
        query?: Query
    ): Promise<ProductModel> {
        return await this.jumbo.get(`products/${productId}`, headers, query);
    }

    /**
     * Get products from given product name
     * @param productName Product name to search for
     * @param offset Offset in search (default 0)
     * @param limit Amount of products returned (default 10)
     * @param filters Any extra filters (in the form of a number)
     * @param sort Sort options as defined in ./productModel
     */
    async getProductsFromName(
        productName: string,
        offset?: number,
        limit?: number,
        filters?: number,
        sort?: ProductSortOptions,
        headers?: Headers,
        query?: Query
    ): Promise<ProductModel[]> {
        // First get query results as productQueryModel
        const products: ProductQueryModel = await this.jumbo.get(
            `search`,
            headers,
            {
                q: productName,
                offset: (offset ? offset : 0).toString(),
                limit: (limit ? limit : 10).toString(),
                filters: (filters ? filters : '').toString(),
                sort: (sort ? sort : '').toString(),
                ...query,
            }
        );
        // Then create a ProductModel for every ProductQuery product
        const result: ProductModel[] = [];
        for (var key in products.products.data) {
            const product: ProductModel = {
                product: {
                    data: products.products.data[key],
                },
            };
            result.push(product);
        }
        // Return array of ProductModels
        return result;
    }

    /**
     * Shortcut function to get the first product when searching for name
     * @param productName Product name to search for
     * @param sort Sort options as defined in ./productModel
     */
    async getFirstProductFromName(
        productName: string,
        sort?: ProductSortOptions,
        headers?: Headers,
        query?: Query
    ): Promise<ProductModel> {
        const product = await this.getProductsFromName(
            productName,
            0,
            1,
            undefined,
            sort,
            headers,
            query
        );
        return product[0];
    }
}
