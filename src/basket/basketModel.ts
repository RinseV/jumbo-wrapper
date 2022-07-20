import { Price } from '../product/productModel';
export interface BasketModel {
    id: string;
    products: Item[];
    vagueTerms: [];
    version: string;
    prices: Price;
    totalProductCount: number;
    movMessage: string;
}
export interface Item {
    id: string;
    lastModified: Date;
    sku: string;
    unit: string;
    quantity: number;
    details: [];
}

export {};
