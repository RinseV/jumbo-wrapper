import { ProductImage, Author } from './publicListsModel';

export interface ListQueryModel {
    items: QueryList[];
    total: number;
}

interface QueryList {
    author: Author;
    description?: string;
    followerCount: number;
    hasReachedProductLimit: boolean;
    id: string;
    image?: string;
    isPublic: boolean;
    labels: string[];
    profileID: string;
    thumbnail?: string;
    title: string;
    totalProducts: number;
    type: string;
    webUrl: string;
    productImages?: ProductImage[][];
    userID?: string;
}
