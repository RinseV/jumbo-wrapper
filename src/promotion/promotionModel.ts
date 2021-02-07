export interface PromotionModel {
    tabs: Tab[];
}

interface Tab {
    periods: Period[];
    title: string;
    type: string;
}

interface Period {
    sections: Section[];
    endDateTime?: string;
    startDateTime?: string;
    title?: string;
}

interface Section {
    description: string;
    promotions: Promotion[];
    title: string;
    displayFromDate?: string;
    endDate?: string;
}

interface Promotion {
    description: string;
    enablePromoAssistance: boolean;
    fromDate: number;
    id: string;
    label: string;
    name: string;
    offline: boolean;
    offlineText: string;
    priceInformation: string;
    promotionImage: PromotionImage;
    stickerBadges: any[];
    summary: string;
    tags: Tag[];
    toDate: number;
    uuid: string;
    validityPeriod: string;
    badgeImage?: PromotionImage;
}

interface Tag {
    text: string;
    type: string;
}

interface PromotionImage {
    main: string;
}
