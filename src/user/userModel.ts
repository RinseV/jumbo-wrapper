export interface UserModel {
    address: Address;
    allowProfiling: boolean;
    birthdayMS: number;
    email: string;
    firstName: string;
    gender: string;
    identifier: string;
    lastName: string;
    permissions: Permissions;
    phoneNumber: PhoneNumber;
    socialListOptin: boolean;
    store: Store;
    suffix: string;
    type: string;
}

interface Store {
    cityName: string;
    complexNumber: string;
    facilities: string[];
    id: string;
    isLastOrderStore: boolean;
    latitude: number;
    longitude: number;
    name: string;
    newLocation: boolean;
    openingTimes: OpeningTime[];
    phoneNumber: string;
    streetAddress: string;
    type: string;
    zipCode: string;
}

interface OpeningTime {
    date: number;
    time: string;
    today?: boolean;
}

interface PhoneNumber {
    countryCode: string;
    number: string;
}

interface Permissions {
    billingInformation: string;
    companyInformation: string;
    contactInformation: string;
    deliveryAddress: string;
    deliveryInstructions: string;
    homeStore: string;
    loginCredentials: string;
    paymentMethod: string;
}

interface Address {
    addressLine: string;
    city: string;
    country: string;
    countryCode: string;
    houseNumber: string;
    houseNumberAddition: string;
    postalcode: string;
}
