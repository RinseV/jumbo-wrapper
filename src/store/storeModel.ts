export interface StoreModel {
    store: Store;
}

interface Store {
    data: StoreData;
}

export interface StoreData {
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
    phoneNumber: string;
    facilities: string[];
}

interface OpeningTime {
    date: number;
    time: string;
    today?: boolean;
}
