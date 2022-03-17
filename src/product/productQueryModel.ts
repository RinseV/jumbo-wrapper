import { ProductData } from './productModel';

export interface ProductQueryModel {
    products: Products;
    filters: Filter;
    horizontalFilters: HorizontalFilters;
    sortOptions: SortOptions;
    productLists: ProductLists;
}

interface ProductLists {
    data: any[];
}

interface SortOptions {
    data: SortOptionsData[];
}

interface SortOptionsData {
    title: string;
    sort: string;
}

interface HorizontalFilters {
    data: HorizontalFilterData[];
}

interface HorizontalFilterData {
    title: string;
    filters: string;
}

interface Filter {
    data: (ActiveFilter | FilterData)[];
}

interface ActiveFilter {
    count: number;
    dimensionName: string;
    ifRemovedFilters: string;
    isCategory: boolean;
    multiSelect: boolean;
    title: string;
    type: string;
}

interface FilterData {
    title: string;
    type: string;
    items: Item[];
}

interface Item {
    title: string;
    filters: string;
    count: number;
    isCategory: boolean;
}

interface Products {
    data: ProductData[];
    total: number;
    offset: number;
}
