import { Jumbo, Query } from '../jumbo';
import { ProductModel } from './productModel';
import { ProductQueryModel } from './productQueryModel';
import { Headers } from 'node-fetch';

export class Product {
    constructor(private readonly jumbo: Jumbo) {}

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
     * @param filters Any extra filters
     */
    async getProductsFromName(
        productName: string,
        offset?: number,
        limit?: number,
        filters?: string,
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
                filters: filters ? filters : '',
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
     */
    async getFirstProductFromName(
        productName: string,
        headers?: Headers,
        query?: Query
    ): Promise<ProductModel> {
        const product = await this.getProductsFromName(
            productName,
            0,
            1,
            undefined,
            headers,
            query
        );
        return product[0];
    }
}
