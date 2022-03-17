import { QuantityOption, ImageInfo, Prices, BadgesToDisplay, Badge } from '../product/productModel';

export interface RecipeModel {
    recipe: Recipe;
}

interface Recipe {
    data: RecipeData;
}

export interface RecipeData {
    calories?: number;
    cookingTime: number;
    cookingTip?: string;
    course?: string;
    difficultyLevel?: string;
    dishType?: string;
    id: string;
    imageInfo: ImageInfo;
    ingredients?: Ingredient[];
    instructions?: string[];
    name: string;
    numberOfPortions: number;
    webUrl: string;
}

interface Ingredient {
    name: string;
    productInformation?: RecipeProductInformation;
    quantity: string;
}

interface RecipeProductInformation {
    product: RecipeProduct;
    quantity: Quantity;
}

interface Quantity {
    amount: number;
    unit: string;
}

interface RecipeProduct {
    available: boolean;
    crossSellSKUList: any[];
    id: string;
    imageInfo: ImageInfo;
    prices: Prices;
    productType: string;
    quantity?: string;
    quantityOptions: QuantityOption[];
    title: string;
    topLevelCategory: string;
    topLevelCategoryId: string;
    stickerBadges?: string[];
    badge?: Badge;
    badgesToDisplay?: BadgesToDisplay;
}
