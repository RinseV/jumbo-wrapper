export interface OrderModel {
    order: Order;
}

interface Order {
    data: OrderData;
}

export interface OrderData {
    created: number;
    delivery: Delivery;
    id: string;
    leftToPay?: Price;
    numberOfCrates?: number;
    numberOfPlasticBags?: number;
    orderCutOffDate: number;
    orderProducts?: OrderProduct[];
    paymentMethod?: string;
    payments?: Payment[];
    pickedUp?: number;
    prices?: OrderPrice | OrderQueryPrice;
    shipping?: Shipping;
    status: string;
    storeID?: string;
    type: string;
}

interface Shipping {
    liveETA: number;
    plannedETAEnd: number;
    plannedETAStart: number;
    unknownLiveETA: boolean;
}

interface OrderPrice {
    depositsReturned: Price;
    itemTotal: Price;
    paid: Price;
    pickupPointCost: Price;
    plasticBags: Price;
    subtotal: Price;
    total: Price;
    totalDiscounts: Price;
    totalNet: Price;
    totalVat21: Price;
    totalVat6: Price;
    totalVatHigh: Price;
    totalVatLow: Price;
}

interface Payment {
    date: number;
    merchantReference: string;
    price: Price;
    pspReference: string;
    status: string;
    type: string;
}

interface OrderProduct {
    product: Product;
    quantity: Quantity;
    sample: boolean;
    triggeredByFreeGift: boolean;
}

interface Quantity {
    amount: number;
    unit: string;
}

interface Product {
    available: boolean;
    badge?: Badge;
    badgesToDisplay?: BadgesToDisplay;
    crossSellSKUList: any[];
    id: string;
    imageInfo: ImageInfo;
    prices: Prices;
    productType: string;
    quantity?: string;
    quantityOptions: QuantityOption[];
    sample: boolean;
    title: string;
    topLevelCategory: string;
    topLevelCategoryId?: string;
    triggeredByFreeGift: boolean;
    unavailabilityReason: string;
    stickerBadges?: string[];
}

interface QuantityOption {
    amountStep: number;
    defaultAmount: number;
    maximumAmount: number;
    minimumAmount: number;
    unit: string;
}

interface Prices {
    price: Price;
    unitPrice: UnitPrice;
}

interface UnitPrice {
    price?: Price;
    unit: string;
}

interface ImageInfo {
    primaryView: PrimaryView[];
}

interface PrimaryView {
    height: number;
    url: string;
    width: number;
}

interface BadgesToDisplay {
    leftTop?: Badge;
    rightTop?: Badge;
}

interface Badge {
    image: string;
}

export interface Delivery {
    address: Address;
    collectionDateTime: number;
    date: number;
    endDateTime: number;
    location: Location;
    price: Price;
    startDateTime: number;
    time: string;
}

export interface Price {
    amount: number;
    currency: string;
}

export interface Location {
    cityName: string;
    complexNumber: string;
    id: string;
    latitude: number;
    longitude: number;
    name: string;
    newLocation: boolean;
    streetAddress: string;
    type: string;
    zipCode: string;
}

export interface Address {
    addressLine: string;
    city: string;
    country: string;
    countryCode: string;
    houseNumber: string;
    postalcode: string;
}

export interface OrderQueryPrice {
    total: Price;
}
