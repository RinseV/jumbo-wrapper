import { RecipeData } from './recipeModel';

export interface RecipeQueryModel {
    filters: Filters;
    recipes: Recipes;
}

interface Recipes {
    data: RecipeData[];
    offset: number;
    total: number;
}

interface Filters {
    data: FilterData[];
}

interface FilterData {
    items: Item[];
    type: string;
    title?: string;
}

interface Item {
    count: number;
    id: string;
    isCategory: boolean;
    title: string;
}
