export interface ProductModel {
    product: Product;
}

interface Product {
    data: ProductData;
}

export interface ProductData {
    id: string;
    title: string;
    quantityOptions: QuantityOption[];
    prices: Prices;
    available: boolean;
    productType: string;
    crossSellSKUList: any[];
    quantity: string;
    imageInfo: ImageInfo;
    badgesToDisplay: BadgesToDisplay;
    badge: LeftTop;
    stickerBadges: string[];
    topLevelCategory: string;
    topLevelCategoryId: string;
    nixProduct: boolean;
    hasRelatedProducts: boolean;
    nutritionalInformation: NutritionalInformation[];
    detailsText: string;
    regulatedTitle: string;
    allergyText: string;
    nutritionalClaimInfo: string;
    healthClaimInfo: string;
    ingredientInfo: IngredientInfo[];
    allergyInfo: AllergyInfo;
    usageAndSafetyInfo: UsageAndSafetyInfo;
    additiveInfo: AdditiveInfo;
    brandInfo: BrandInfo;
}

interface BrandInfo {
    brandDescription: string;
    manufacturerAddress: string;
    webAddress: string;
}

interface AdditiveInfo {
    thirdparty: string;
}

interface UsageAndSafetyInfo {
    storageType: string;
    recyclingInfo: string;
}

interface AllergyInfo {
    allergyText: string;
}

interface IngredientInfo {
    productTitle: string;
    ingredients: Ingredient[];
    allergens: Allergen[];
}

interface Allergen {
    name: string;
    highlights: Highlight[];
}

interface Ingredient {
    name: string;
    containsAllergens: boolean;
    highlights: Highlight[];
}

interface Highlight {
    length: number;
    offset: number;
}

interface NutritionalInformation {
    productTitle: string;
    nutritionalGuidelines: NutritionalGuidelines;
    nutritionalData: NutritionalData;
}

interface NutritionalData {
    entries: NutritionalDataEntry[];
    portionSize: string;
}

interface NutritionalDataEntry {
    name: string;
    valuePer100g: string;
    valuePerPortion: string;
}

interface NutritionalGuidelines {
    entries: NutritionalGuideline[];
}

interface NutritionalGuideline {
    name: string;
    quantity: string;
    percentage: string;
}

export interface BadgesToDisplay {
    leftTop?: LeftTop;
    rightTop?: LeftTop;
}

export interface Badge {
    image: string;
}

interface LeftTop {
    image: string;
}

export interface ImageInfo {
    primaryView: PrimaryView[];
    lifeStyle?: PrimaryView[];
    details?: PrimaryView[];
}

export interface PrimaryView {
    url: string;
    width: number;
    height: number;
}

export interface Prices {
    price: Price;
    promotionalPrice?: Price;
    unitPrice: UnitPrice;
}

export interface UnitPrice {
    unit: string;
    price?: Price;
}

export interface Price {
    currency: string;
    amount: number;
}

export interface QuantityOption {
    defaultAmount: number;
    minimumAmount: number;
    amountStep: number;
    unit: string;
    maximumAmount: number;
}
