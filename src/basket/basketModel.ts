import { ImageInfo, Price, QuantityOption } from '../product/productModel';
export interface BasketModel {
    id: string;
    products: BasketProduct[];
    vagueTerms: unknown[];
    version: string;
    prices: Price;
    totalProductCount: number;
    movMessage: string;
}

export interface BasketPrices {
    deposit: Price;
    discount: Price;
    gross: Price;
    shippingCosts: Price;
    tax: Price;
    total: Price;
}
export interface BasketProduct {
    id: string;
    lastModified: number;
    sku: string;
    unit: string;
    quantity: number;
    prices: BasketProductPrices;
    details: BasketProductDetails;
}

export interface BasketProductPrices {
    price: Price;
}

export interface BasketProductDetails {
    availability: BasketProductAvailability;
    available: boolean;
    id: string;
    imageInfo: ImageInfo;
    productType: string;
    quantity: string;
    quantityOptions: QuantityOption[];
    regulatedTitle: string;
    title: string;
    topLevelCategory: string;
    topLevelCategoryId: string;
}

export interface BasketProductAvailability {
    availability: string;
    sku: string;
}

export interface PutBasketItems {
    items: BasketItems[];
    vagueTerms: unknown[];
}

export interface BasketItems {
    quantity: number;
    sku: string;
    unit: string;
}

export interface PutBasketResponseItem {
    id: string;
    lastModified: Date;
    quantity: number;
    sku: string;
    unit: string;
}

export interface PutBasketResponse {
    id: string;
    items: PutBasketResponseItem[];
    type: string;
    vagueTerms: unknown[];
    version: string;
}
