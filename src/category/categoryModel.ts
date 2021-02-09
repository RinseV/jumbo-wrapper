export interface CategoryModel {
    categories: Categories;
}

interface Categories {
    data: CategoryData[];
}

interface CategoryData {
    id: string;
    subCategoriesCount: number;
    title: string;
}
