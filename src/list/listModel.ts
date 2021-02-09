import { PrimaryView } from '../product/productModel';

export interface ListQueryModel {
    items: ListModel[];
    total: number;
}

export interface ListModel {
    followerCount: number;
    hasReachedProductLimit: boolean;
    id: string;
    isPublic: boolean;
    labels: any[];
    productImages: PrimaryView[][];
    title: string;
    totalProducts: number;
    type: string;
    userID: string;
}
