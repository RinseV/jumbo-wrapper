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
    entries: Entry2[];
    portionSize: string;
}

interface Entry2 {
    name: string;
    valuePer100g: string;
    valuePerPortion: string;
}

interface NutritionalGuidelines {
    entries: Entry[];
}

interface Entry {
    name: string;
    quantity: string;
    percentage: string;
}

interface BadgesToDisplay {
    leftTop: LeftTop;
}

interface LeftTop {
    image: string;
}

interface ImageInfo {
    primaryView: PrimaryView[];
    lifeStyle: PrimaryView[];
    details: PrimaryView[];
}

interface PrimaryView {
    url: string;
    width: number;
    height: number;
}

interface Prices {
    price: Price;
    unitPrice: UnitPrice;
}

interface UnitPrice {
    unit: string;
    price: Price;
}

interface Price {
    currency: string;
    amount: number;
}

interface QuantityOption {
    defaultAmount: number;
    minimumAmount: number;
    amountStep: number;
    unit: string;
    maximumAmount: number;
}
