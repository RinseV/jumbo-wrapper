import { BadgesToDisplay, QuantityOption, Prices, ImageInfo } from '../product/productModel';

export interface ListItemsModel {
    items: ListItem[];
    total: number;
}

interface ListItem {
    id: string;
    product: ListProduct;
    quantity: ListQuantity;
}

interface ListQuantity {
    amount: number;
    unit: string;
}

export interface ListProduct {
    available: boolean;
    id: string;
    imageInfo: ImageInfo;
    prices: Prices;
    productType?: string;
    quantity?: string;
    quantityOptions: QuantityOption[];
    stickerBadges: string[];
    title: string;
    topLevelCategory: string;
    badgesToDisplay?: BadgesToDisplay;
    unavailabilityReason?: string;
}
