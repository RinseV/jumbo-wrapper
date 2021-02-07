import { Jumbo, Query } from '../jumbo';
import { ProductModel } from './productModel';
import { Headers } from '../jumbo';

export class Product {
    constructor(private readonly jumbo: Jumbo) {}

    async getProductFromId(
        productId: string,
        headers?: Headers,
        query?: Query
    ): Promise<ProductModel> {
        return await this.jumbo.get(`products/${productId}`, headers, query);
    }
}
