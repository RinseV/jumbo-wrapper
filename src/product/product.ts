import { Headers, Query } from '../jumbo';
import { JumboObject } from '../base/jumboObject';
import { ProductModel } from './productModel';
import { ProductQueryModel } from './productQueryModel';

export class Product extends JumboObject {
    /**
     * Gets product from ID
     * @param productId Product ID
     */
    async getProductFromId(productId: string, headers?: Headers, query?: Query): Promise<ProductModel> {
        return await this.jumbo.get(`products/${productId}`, headers, query);
    }

    /**
     * Get products from given product name
     * @param productName Product name to search for
     * @param offset Offset in search (default 0)
     * @param limit Amount of products returned (default 10)
     * @param filter Filters (from ProductFilter)
     * @param sort Sort options as defined in ./productModel
     */
    async getProductsFromName(
        productName: string,
        offset?: number,
        limit?: number,
        filter?: ProductFilter,
        sort?: ProductSortOptions,
        headers?: Headers,
        query?: Query
    ): Promise<ProductModel[]> {
        const totalQuery: Query = {
            q: productName,
            offset: (offset ? offset : 0).toString(),
            limit: (limit ? limit : 10).toString(),
            sort: (sort ? sort : '').toString()
        };
        if (filter) {
            totalQuery['filters'] = this.translateProductFilterToQuery(filter);
        }
        // First get query results as productQueryModel
        const products: ProductQueryModel = await this.jumbo.get(`search`, headers, {
            ...totalQuery,
            ...query
        });
        // Then create a ProductModel for every ProductQuery product
        const result: ProductModel[] = [];
        for (var key in products.products.data) {
            const product: ProductModel = {
                product: {
                    data: products.products.data[key]
                }
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
        const product = await this.getProductsFromName(productName, 0, 1, undefined, sort, headers, query);
        return product[0];
    }

    /**
     * Translates the product filters to a usable query
     */
    private translateProductFilterToQuery(filter: ProductFilter): string {
        // Simply join all of the numbers together with spaces
        const out: string[] = [];
        if (filter.diet) {
            out.push(filter.diet.map((diet: number) => diet.toString()).join(' '));
        }
        if (filter.allergens) {
            out.push(filter.allergens.map((allergy: number) => allergy.toString()).join(' '));
        }
        if (filter.other) {
            out.push(filter.other.map((other: number) => other.toString()).join(' '));
        }
        return out.join(' ');
    }
}

/**
 * The different sort options for products
 */
export enum ProductSortOptions {
    POPULAR = 'P_Sales|1',
    PRICE_ASC = 'P_Price|0',
    PRICE_DESC = 'P_Price|1',
    ALPHAB_ASC = 'P_Title|0',
    ALPHAB_DESC = 'P_Title|1',
    PER_WEIGHT_MEASURE = 'pricePerWeightMeasure|0'
}

/**
 * Currently available filters
 * diet: any dietary restrictions, can be filtered from ProductDietFilter
 * allergens: any allergens that are not allowed, can be filtered from ProductAllergenFilter
 * other: any other restrictions, in the form of an array of numbers
 */
export interface ProductFilter {
    diet?: ProductDietFilter[];
    allergens?: ProductAllergenFilter[];
    other?: number[];
}

export enum ProductDietFilter {
    Bio = 4294960557,
    LactoseIntolerant = 4294960541,
    Vegan = 204294960595,
    GlutenIntolerant = 4294960639,
    NoAddedSugar = 4294960544,
    NoAddedSalt = 4294960120,
    Vegetarian = 4294960623,
    LowFat = 4294960596,
    LowSugar = 4294952996,
    NoSugar = 4294960685,
    NoFat = 4294960453,
    FatPoor = 4294926481,
    Halal = 4294960615,
    Kosher = 4294960433
}

export enum ProductAllergenFilter {
    Lactose = 4294960577,
    Gluten = 4294960640,
    Diary = 4294960597,
    Milk = 4294960576,
    Soy = 4294960064,
    Peanuts = 4294960574,
    Nuts = 4294960575,
    Wheat = 4294960573,
    Eggs = 4294960578
}
