import { StoreData } from './storeModel';

export interface StoreQueryModel {
    stores: Stores;
    filters: Filters;
}

interface Filters {
    data: FilterData[];
}

interface FilterData {
    type: string;
    items: Item[];
    title?: string;
}

interface Item {
    id: string;
    title: string;
}

interface Stores {
    data: StoreData[];
    offset: number;
    total: number;
}

interface Datum {
    id: string;
    complexNumber: string;
    name: string;
    type: string;
    streetAddress: string;
    cityName: string;
    zipCode: string;
    longitude: number;
    latitude: number;
    newLocation: boolean;
    isLastOrderStore: boolean;
    openingTimes: OpeningTime[];
    isHomeStore: boolean;
}

interface OpeningTime {
    date: number;
    time: string;
    today: boolean;
}
