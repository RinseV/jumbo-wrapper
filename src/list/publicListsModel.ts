export interface PublicListsModel {
    items: SmartList[] | FollowingList[];
    total: number;
}

interface SmartList {
    author: Author;
    description: string;
    hasReachedProductLimit: boolean;
    id: string;
    productImages: ProductImage[][];
    smartListType: string;
    state: string;
    thumbnail: string;
    thumbnailSubtitle: string;
    thumbnailTitle: string;
    title: string;
    totalProducts: number;
    type: string;
}

export interface ProductImage {
    height: number;
    url: string;
    width: number;
}

export interface Author {
    name: string;
    image?: string;
    verified?: boolean;
}

interface FollowingList {
    author: Author;
    description: string;
    followerCount: number;
    hasReachedProductLimit: boolean;
    id: string;
    image: string;
    isPublic: boolean;
    labels: string[];
    profileID: string;
    thumbnail: string;
    title: string;
    totalProducts: number;
    type: string;
    webUrl: string;
}

export interface Following {
    isFollowing: boolean;
}
