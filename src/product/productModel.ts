export interface ProductModel {
    data: ProductData;
}

export interface ProductData {
    additiveInfo: AdditiveInfo;
    allergyInfo: AllergyInfo;
    allergyText: string;
    available: boolean;
    badge: ProductBadge;
    brandInfo: BrandInfo;
    crossSellSKUList: string[];
    detailsText: string;
    hasRelatedProducts: boolean;
    healthClaimInfo: string;
    id: string;
    imageInfo: ImageInfo[];
    ingredientInfo: IngredientInfo[];
    nixProduct: boolean;
    nutritionalClaimInfo: string;
    nutritionalInformation: NutritionalInformation;
    prices: Prices;
    productType: string;
    quantity: string;
    quantityOptions: QuantityOptions;
    regulatedTitle: string;
    stickerBadges: string[];
    title: string;
    topLevelCategory: string;
    topLevelCategoryId: string;
    usageAndSafetyInfo: UsageAndSafetyInfo;
}

export interface UsageAndSafetyInfo {
    recyclingInfo: string;
    storageType: string;
}

export interface QuantityOptions {
    amountStep: number;
    defaultAmount: number;
    maximumAmount: number;
    minimumAmount: number;
    unit: string;
}

export interface Prices {
    price: Price;
    unitPrice: UnitPrice;
}

export interface Price {
    amount: number;
    currency: string;
}

export interface UnitPrice {
    price: Price;
    unit: string;
}

export interface NutritionalInformation {
    nutritionalData: NutritionalData;
    nutritionalGuidelines: NutritionalData;
    productTitle: string;
}

export interface NutritionalData {
    entries: Nutrition[];
    portionSize: string;
}

export interface Nutrition {
    name: string;
    valuePer100g: string;
    valuePerPortion: string;
}

export interface AdditiveInfo {
    thirdparty: string;
}

export interface AllergyInfo {
    allergyText: string;
}

export interface ProductBadge {
    image: string;
}

export interface BrandInfo {
    brandDescription: string;
    manufacturerAddress: string;
    webAddress: string;
}

export interface ImageInfo {
    details: ImageDetail[];
    lifeStyle: ImageDetail[];
    primaryView: ImageDetail[];
}

export interface ImageDetail {
    height: number;
    url: string;
    width: number;
}

export interface IngredientInfo {
    allergens: Allergens[];
    ingredients: Ingredient[];
}

export interface Allergens {
    name: string;
}

export interface Ingredient {
    containsAllergens: true;
    name: string;
}
